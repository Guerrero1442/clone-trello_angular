import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { ResponseLogin } from '@app/models/auth.model';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.API_URL}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/api/v1/auth/register`, {
      name,
      email,
      password,
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.API_URL}/api/v1/auth/is-available`,
      {
        email,
      }
    );
  }

  recovery(email: string) {
    return this.http.post<{ link: string; recoveryToken: string }>(
      `${this.API_URL}/api/v1/auth/recovery`,
      {
        email,
      }
    );
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.API_URL}/api/v1/auth/change-password`, {
      token,
      newPassword,
    });
  }

  getProfile() {
    return this.http
      .get<User>(`${this.API_URL}/api/v1/auth/profile`, {
        context: checkToken(),
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
        })
      );
  }

  refreshToken(refreshToken: string) {
    return this.http
      .post<ResponseLogin>(`${this.API_URL}/api/v1/auth/refresh-token`, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
}
