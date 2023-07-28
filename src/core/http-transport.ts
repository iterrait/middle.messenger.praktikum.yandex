export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  headers?: Record<any, any>,
  data?: any,
}

type RequestOptions = {
  method: string,
  headers?: Record<any, any>,
  data?: any,
}


function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type HTTPMethod<Response = void> = (url: string, options?: unknown) => Promise<unknown>;

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (url: string, options: Options) => {
    return this.request(options?.data
      ? `${this.endpoint + url}${queryStringify(options?.data)}`
      : (this.endpoint + url), {
      ...options,
      method: Method.Get
    });
  };


  post: HTTPMethod = (url: string, options: Options) => {
    return this.request(this.endpoint + url, { ...options, method: Method.Post });
  };

  put: HTTPMethod = (url: string, options: Options, headers = {}) => {
    return this.request(this.endpoint + url, { ...options, method: Method.Put, headers });
  };

  patch: HTTPMethod = (url: string, options: Options) => {
    return this.request(this.endpoint + url, { ...options, method: Method.Patch });
  };

  delete: HTTPMethod = (url: string, options: Options) => {
    return this.request(this.endpoint + url, { ...options, method: Method.Delete });
  }

  private request = (url: string, options: RequestOptions) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = (e) => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
