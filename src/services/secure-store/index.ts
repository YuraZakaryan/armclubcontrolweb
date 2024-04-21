import secureLocalStorage from 'react-secure-storage';

export class SecureStoreService {
  static access_token = 'access_token';
  static refresh_token = 'refresh_token';

  static saveAccessToken(token: string) {
    return secureLocalStorage.setItem(this.access_token, token);
  }

  static saveRefreshToken(token: string) {
    return secureLocalStorage.setItem(this.refresh_token, token);
  }

  static getAccessToken() {
    return secureLocalStorage.getItem(this.access_token);
  }

  static getRefreshToken() {
    return secureLocalStorage.getItem(this.refresh_token);
  }

  static deleteAccessToken() {
    return secureLocalStorage.removeItem(this.access_token);
  }

  static deleteRefreshToken() {
    return secureLocalStorage.removeItem(this.refresh_token);
  }
}
