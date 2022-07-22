export const Storage = () => {
  const getToken = () => window.localStorage.getItem('token');

  const setToken = (token: string) => {
    window.localStorage.setItem('token', token);
  };

  return { getToken, setToken };
};
