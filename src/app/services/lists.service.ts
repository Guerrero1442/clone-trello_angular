import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token.interceptor';
import { CreateListDto, List } from '@app/models/list.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  API_URL = environment.API_URL;

  constructor(private http:HttpClient) { }

  create(list: CreateListDto) {
    return this.http.post<List>(`${this.API_URL}/api/v1/lists`, list,{
      context: checkToken()
    });
  }

  update(id: List['id'], changes: Partial<List>) {
    return this.http.put<List>(`${this.API_URL}/api/v1/lists/${id}`, changes,{
      context: checkToken()
    });
  }
}
