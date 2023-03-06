import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken() {
    return getCookie('token');
  }

  removeToken() {
    removeCookie('token');
  }

  saveRefreshToken(token: string) {
    setCookie('refreshToken', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    return getCookie('refreshToken');
  }

  removeRefreshToken() {
    removeCookie('refreshToken');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
