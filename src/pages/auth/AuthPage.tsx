import React, { useEffect, useState } from 'react';
import { useAuth } from '../../routes/useAuth';
import { Storage } from '../../shared/storage';
import { authService } from './authService';

const AuthPage = () => {
  const auth = useAuth();

  const [state, setState] = useState({
    username: 'test',
    password: '1234',
    isLogged: false,
  });
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      const target = event.target as typeof event.target & {
        username: { value: string };
        password: { value: string };
      };

      if (state.username.length < 1 || state.password.length < 1) {
        setState({
          ...state,
          username: target.username.value,
          password: target.password.value,
        });
      }
      authService().signIn(state.username, state.password).then((res) => {
        Storage().setToken(res.access_token);
        auth?.signin(true);
      });
    } else {
      form.classList.add('was-validated');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input type="text" name="username" value={state.username} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={state.password} />
        </label>
      </div>
      <div>
        <input type="submit" value="Log in" />
      </div>
    </form>
  );
};

export default AuthPage;
