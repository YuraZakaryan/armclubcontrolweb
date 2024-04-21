import { TResponseBody } from '@redux/types';
import { AxiosError } from 'axios';

export const handleAxiosError = (err: AxiosError, message?: boolean) => {
  if (err.response) {
    if (message) {
      const res = err.response.data as TResponseBody;
      return res;
    }
    return err.response.status;
  } else {
    return err.code;
  }
};
