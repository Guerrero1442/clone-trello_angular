import { Component, OnInit } from '@angular/core';
import {
  faClock,
  faDashboard,
  faBox,
  faWaveSquare,
  faAngleUp,
  faAngleDown,
  faHeart,
  faGear,
  faBorderAll,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { MeService } from '@app/services/me.service';
import { Board } from '@app/models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit {
  faClock = faClock;
  faDashboard = faDashboard;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faTrello = faTrello;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faGear = faGear;
  faBorderAll = faBorderAll;
  faUsers = faUsers;

  boards: Board[] = [];

  constructor(private meService: MeService) {}

  ngOnInit(): void {
    this.getMyBoards();
  }

  getMyBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }
}
