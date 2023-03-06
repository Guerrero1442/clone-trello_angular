import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@app/services/token.service';
import { AuthService } from '@app/services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      const isValideToken = this.tokenService.isValidToken();
      if (!isValideToken) {
        return this.updateAccessToken(request, next);
      } else {
        return this.addToken(request, next);
      }
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const access_token = this.tokenService.getToken();
    if (access_token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${access_token}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private updateAccessToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const refreshToken = this.tokenService.getRefreshToken();
    const isValideRefreshToken = this.tokenService.isValidRefreshToken();
    if (refreshToken && isValideRefreshToken) {
      return this.authService
        .refreshToken(refreshToken)
        .pipe(switchMap(() => this.addToken(request, next)));
    }
    return next.handle(request);
  }
}
