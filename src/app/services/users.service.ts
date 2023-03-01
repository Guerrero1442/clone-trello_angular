import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  API_URI = environment.API_URL;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.API_URI}/api/v1/users`, {
      context: checkToken(),
    });
  }
}
