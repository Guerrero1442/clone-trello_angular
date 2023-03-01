import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { TokenService } from '@app/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const isValideToken = this.tokenService.isValideRefreshToken();
    if (!isValideToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
