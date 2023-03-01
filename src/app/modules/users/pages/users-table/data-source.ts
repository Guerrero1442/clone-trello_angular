import { DataSource } from '@angular/cdk/collections';
import { User } from '@app/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceGeneric<T> extends DataSource<T> {
  data = new BehaviorSubject<T[]>([]);
  originalData: T[] = [];

  connect(): Observable<T[]> {
    return this.data;
  }

  init(data: T[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() {}
}
