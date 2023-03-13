import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Board } from '@app/models/board.model';
import { Card } from '@app/models/card.model';
import { List } from '@app/models/list.model';
import { BoardsService } from '@app/services/boards.service';
import { CardsService } from '@app/services/cards.service';
import { MeService } from '@app/services/me.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-copy-overlay',
  templateUrl: './copy-overlay.component.html',
  styles: [
    `
      select {
        appearance: none;
        background-image: none;
      }
    `,
  ],
})
export class CopyOverlayComponent {
  faClose = faClose;
  @Output() closeOverlay = new EventEmitter();
  @Input() list: List;
  @Input() boardID: Board['id'];
  @Input() card: Card;
  form: FormGroup;

  boards: Board[] = [];
  lists: List[] = [];
  positions: Card['position'][] = [];

  @ViewChild('myTextarea') textarea: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardsService,
    private boardService: BoardsService,
    private meService: MeService
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(): void {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
      this.filterLists(this.boardID, this.list.id);
      this.buildForm(this.boardID, this.list.id, this.list.cards.length + 1);
      this.form.get('boardId')?.valueChanges.subscribe((boardId) => {
        this.filterLists(boardId);
      });
      this.form.get('listId')?.valueChanges.subscribe((listId) => {
        this.filterPositions(listId);
      });
    });
  }

  private buildForm(
    boardId: Board['id'] = 0,
    listId: List['id'] = 0,
    position: Card['position'] = 0
  ) {
    this.form = this.formBuilder.group({
      title: [this.card.title, [Validators.required]],
      boardId: [boardId],
      listId: [listId],
      positionMove: [position],
    });
  }

  doClose() {
    this.closeOverlay.emit();
  }

  filterLists(boardId: any, listId: number = 0) {
    this.boardService.getBoard(boardId).subscribe((board) => {
      this.lists = board.lists;
      if (this.lists.length > 0 && listId == 0) {
        this.filterPositions(this.lists[0].id);
        this.form.patchValue({ listId: this.lists[0].id });
      } else {
        this.filterPositions(listId);
        this.form.patchValue({ listId: listId });
      }
    });
  }

  filterPositions(listId: List['id']) {
    const list = this.lists.find((list) => list.id == listId);
    if (list) {
      this.positions = Array.from(
        { length: list.cards.length + 1 },
        (_, i) => i + 1
      );
      this.form.patchValue({
        positionMove: this.positions[this.positions.length - 1],
      });
    }
  }

  copyCard() {
    if (this.form.valid) {
      const { title, boardId, listId, positionMove } = this.form.getRawValue();
      const list = this.lists.find((list) => list.id == listId);
      if (list) {
        const position = this.boardService.getPositionMove(
          list.cards,
          positionMove
        );
        this.cardService.create({ title, boardId, listId, position }).subscribe(
          (card) => {
            this.boardService.updateBoard();
            this.closeOverlay.emit();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      this.textarea.nativeElement.focus();
    }
  }
}
