import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { Board } from '@app/models/board.model';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  API_URL = environment.API_URL;

  constructor(private http:HttpClient) {
  }

  getMeProfile(){
    return this.http.get<User>(`${this.API_URL}/api/v1/me/profile`,{
      context: checkToken(),
    });
  }

  getMeBoards(){
    return this.http.get<Board[]>(`${this.API_URL}/api/v1/me/boards`,{
      context: checkToken(),
    });
  }


}
