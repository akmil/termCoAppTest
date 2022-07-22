import React, { useContext, createContext, useState } from 'react';
// import { authService } from '../pages/auth/authService';
import { Storage } from '../shared/storage';

interface AppContextInterface {
  user: boolean;
  signin: (data: boolean) => void;
}

const authContext = createContext<AppContextInterface | null>(null);

function useProvideAuth() {
  const token = Storage().getToken();
  const [user, setUser] = useState(!!token);

  const signin = (data: boolean) => {
    setUser(data);
  };

  // const signout = cb => {
  //   return fakeAuth.signout(() => {
  //     setUser(null);
  //     cb();
  //   });
  // };

  return {
    user,
    signin,
    // signout
  };
}

export function ProvideAuth({ children }: {children: React.ReactNode}) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
