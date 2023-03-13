import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { Board } from '@app/models/board.model';
import { Card } from '@app/models/card.model';
import { Colors } from '@app/models/colors.model';
import { List } from '@app/models/list.model';
import { User } from '@app/models/user.model';
import { environment } from '@environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  API_URI = environment.API_URL;
  bufferSpace = 65535;
  backgroundColor$ = new BehaviorSubject<Colors>('sky');
  private updateSource = new Subject<void>();
  update$ = this.updateSource.asObservable();
  private updateBoards = new Subject<void>();
  updateBoards$ = this.updateBoards.asObservable();


  constructor(private http: HttpClient) {}

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.API_URI}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  createBoard(title: string, backgroundColor: Colors) {
    return this.http.post<Board>(
      `${this.API_URI}/api/v1/boards`,
      {
        title,
        backgroundColor,
      },
      {
        context: checkToken(),
      }
    );
  }

  getPosition(cards: Card[] | List[], currentIndex: number) {
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

  getPositionMove(cards: Card[], indexMove: number) {
    if (cards.length === 0) {
      return this.bufferSpace;
    }
    if (cards.length > 0 && indexMove == 1) {
      const onTopPosition = cards[0].position;
      console.log(onTopPosition, 'onTopPosition')
      return onTopPosition / 2;
    }
    if (cards.length > 0 && indexMove > 1 && indexMove <= cards.length) {
      const onTopPosition = cards[indexMove - 1].position;
      const onBottomPosition = cards[indexMove - 2].position;
      return (onTopPosition + onBottomPosition) / 2;
    }
    if (cards.length > 0 && indexMove > cards.length) {
      const onBottomPosition = cards[cards.length - 1].position;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }

  getPositionNewItem(elements: Card[] | List[]) {
    if (elements.length === 0) {
      return this.bufferSpace;
    }
    const lastIndex = elements.length - 1;
    const onBottomPosition = elements[lastIndex].position;
    return onBottomPosition + this.bufferSpace;
  }

  updateBoard() {
    this.updateSource.next();
  }

  updateBoardsSource() {
    this.updateBoards.next();
  }

  setBackgorundColor(color: Colors) {
    this.backgroundColor$.next(color);
  }
}
