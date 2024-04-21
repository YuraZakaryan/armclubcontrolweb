import { SecureStoreService } from '@services';
import { API_URL } from '@utils/constants';
import axios from 'axios';

export const $authHost = axios.create({
  baseURL: API_URL + '/api',
  timeout: 10000,
});

$authHost.interceptors.request.use(
  (config) => {
    try {
      const access_token = SecureStoreService.getAccessToken();
      if (access_token) {
        config.headers.set({
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        });
      }
      return config;
    } catch (err) {
      return config;
    }
  },
  (err) => Promise.reject(err),
);
