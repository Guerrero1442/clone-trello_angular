import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { Board } from '@app/models/board.model';
import { Card } from '@app/models/card.model';
import { Colors } from '@app/models/colors.model';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  API_URI = environment.API_URL;
  bufferSpace = 65535;

  constructor(private http: HttpClient) {}

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.API_URI}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  createBoard(title:string,backgroundColor: Colors){
    return this.http.post<Board>(`${this.API_URI}/api/v1/boards`,{
      title,
      backgroundColor
    },{
      context: checkToken(),
    })
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position;
      return onTopPosition / 2;
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 1 && currentIndex > 0 && currentIndex < lastIndex) {
      const onTopPosition = cards[currentIndex + 1].position;
      const onBottomPosition = cards[currentIndex - 1].position;
      return (onTopPosition + onBottomPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }


}
