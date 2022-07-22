import { Storage } from './storage';

type RequestOptions = {
  data?: any;
  method?: string;
  withToken?: boolean;
  tokenType?: string;
};

export const network = () => {
  const storage = Storage();
  const prepareRequestOptions = ({
    data, method = 'POST', withToken = true, tokenType = 'Bearer',
  }: RequestOptions) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type',
      withToken ? 'application/json' : 'application/x-www-form-urlencoded');

    if (withToken) {
      const token = storage.getToken();
      myHeaders.append('Authorization', `${tokenType} ${token}`);
    }

    const options = () => {
      if (method !== 'GET') {
        return {
          method,
          type: 'json',
          cache: 'no-cache',
          headers: myHeaders,
          body: data,
        };
      }

      // if GET
      return {
        method,
        type: 'json',
        cache: 'no-cache',
        headers: myHeaders,
      };
    };

    return options();
  };

  const sendRequest = (url: string, requestOptions: RequestOptions) => fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => Promise.reject(error));

  const post = (url: string, requestOptions = {} as RequestOptions) => sendRequest(
    url, prepareRequestOptions({ ...requestOptions, method: 'POST' }),
  );

  const get = (url: string, requestOptions = {} as RequestOptions) => sendRequest(
    url, prepareRequestOptions({ ...requestOptions, method: 'GET' }),
  );

  const put = (url: string, requestOptions = {} as RequestOptions) => sendRequest(
    url, prepareRequestOptions({ ...requestOptions, method: 'PUT' }),
  );

  const patch = (url: string, requestOptions = {} as RequestOptions) => sendRequest(
    url, prepareRequestOptions({ ...requestOptions, method: 'PATCH' }),
  );

  const deletee = (url: string, requestOptions = {} as RequestOptions) => sendRequest(
    url, prepareRequestOptions({ ...requestOptions, method: 'DELETE' }),
  );

  return {
    get,
    post,
    put,
    patch,
    deletee,
  };
};
