import { toast } from 'react-toastify';

export const notifySuccess = (text: string): void => {
  toast(text, { type: 'success' });
};
export const notifyError = (text: string): void => {
  toast(text, { type: 'error' });
};
