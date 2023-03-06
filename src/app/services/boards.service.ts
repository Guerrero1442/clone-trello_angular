import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { Board } from '@app/models/board.model';
import { Card } from '@app/models/card.model';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  API_URI = environment.API_URL;

  constructor(private http: HttpClient) {}

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.API_URI}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  getPosition(cards: Card[],currentIndex:number){
    console.log(cards,currentIndex)

  }
}
