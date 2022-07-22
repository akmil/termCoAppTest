import { apiConfig } from '../../shared/apiConfig';
import { network } from '../../shared/networkHelper';

export const authService = () => {
  const curl = network();

  const apiUrls = {
    LOGIN_URL_POST: `${apiConfig}/auth/login`,
  };

  const signIn = (username: string, password: string) => {
    const data = new URLSearchParams({
      username,
      password,
      grant_type: 'password',
    });

    return curl.post(apiUrls.LOGIN_URL_POST, { data, withToken: false });
  };

  return {
    signIn,
  };
};
