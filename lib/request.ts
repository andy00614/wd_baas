import axios, { AxiosRequestConfig } from 'axios';

export const request = async <T>(
  url: string,
  method: AxiosRequestConfig['method'] = 'GET',
  data: any = null,
  headers: AxiosRequestConfig['headers'] = {}
): Promise<T> => {
  try {
    const options: AxiosRequestConfig = {
      url,
      method,
      headers,
    };

    if (data) {
      options.data = data;
    }

    const response = await axios(options);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
