import { Component, OnInit } from '@angular/core';
import { DataSourceGeneric } from './data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  dataSource = new DataSourceGeneric();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor() {
  }
  ngOnInit(): void {
    // this.usersService.getUsers().subscribe((res) => {
    //   this.dataSource.init(res);
    // });
  }
}
