import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { Card, UpdateCardDto } from '@app/models/card.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  API_URI = environment.API_URL;

  constructor(private http:HttpClient) { }

  update(id: Card['id'],changes: UpdateCardDto){
    return this.http.put<Card>(`${this.API_URI}/api/v1/cards/${id}`,changes,{
      context: checkToken(),
    });
  }
}
