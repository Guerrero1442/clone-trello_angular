import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Esta función sirve para cuando el backend elimina todos los usuarios y se queda sin usuarios
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 400 && request.url.endsWith('profile'))
        if (error.status === 400 && request.url.endsWith('profile')) {
          console.log('Error 400');
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
