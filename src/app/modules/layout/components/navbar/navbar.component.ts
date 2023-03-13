import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '@app/models/board.model';
import { Colors, NAVBAR_COLORS } from '@app/models/colors.model';
import { AuthService } from '@app/services/auth.service';
import { BoardsService } from '@app/services/boards.service';
import { MeService } from '@app/services/me.service';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;
  navbarBackgroundColor: Colors = 'sky';
  colorsNav = NAVBAR_COLORS;

  user$ = this.authService.user$;
  boards: Board[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardService: BoardsService,
    private meService: MeService
  ) {
    this.boardService.backgroundColor$.subscribe((color) => {
      this.navbarBackgroundColor = color;
    });
  }
  ngOnInit(): void {
    this.getBoards();
    this.boardService.updateBoards$.subscribe((res) => {
      this.getBoards();
    });
  }

  getBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  close() {
    this.isOpenOverlayCreateBoard = false;
  }

  get colors() {
    const classes = this.colorsNav[this.navbarBackgroundColor];
    return classes ? classes : this.colorsNav['sky'];
  }
}
