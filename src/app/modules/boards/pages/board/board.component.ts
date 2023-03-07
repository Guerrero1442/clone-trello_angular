import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  faEllipsisH,
  faPlus,
  faX,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from 'src/app/modules/boards/components/todo-dialog/todo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@app/models/board.model';
import { BoardsService } from '@app/services/boards.service';
import { Card, UpdateCardDto } from '@app/models/card.model';
import { CardsService } from '@app/services/cards.service';
import { List } from '@app/models/list.model';
import { FormControl, Validators } from '@angular/forms';
import { ListsService } from '@app/services/lists.service';
import { BACKGROUND_COLORS } from '@app/models/colors.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .example-box:last-child {
        border: none;
      }

      .example-list.cdk-drop-list-dragging
        .example-box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
  // icons
  faEllipsisH = faEllipsisH;
  faEllipsis = faEllipsis;
  faPlus = faPlus;
  faX = faX;
  isOpenBody = false;
  showCardForm = false;
  showListForm = false;
  backgroundColors = BACKGROUND_COLORS;

  board: Board | null = null;
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  inputList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  isOpen: boolean[] = Array(this.board?.lists.length).fill(false);

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private cardService: CardsService,
    private listService: ListsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.boardService.setBackgorundColor('sky');
  }

  drop($event: CdkDragDrop<Card[]>) {
    console.log($event.container.data);
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }
    const position = this.boardService.getPosition(
      $event.container.data,
      $event.currentIndex
    );
    const card = $event.container.data[$event.currentIndex];
    const listId = $event.container.id;
    this.updateCard(card, position, listId);
  }

  dropList($event: CdkDragDrop<List[] | undefined>) {
    if (this.board && $event.container.data) {
      moveItemInArray(
        this.board.lists,
        $event.previousIndex,
        $event.currentIndex
      );
      const position = this.boardService.getPosition($event.container.data, $event.currentIndex);
      const list = $event.container.data[$event.currentIndex];
      // this.listService.update(list.id, { position }).subscribe((res) => {
      //   console.log(res);
      // });
    }
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      autoFocus: false,
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((result) => {
      console.log(result);
    }, console.error);
  }

  private getBoard(id: Board['id']) {
    this.boardService.getBoard(id).subscribe((res) => {
      this.board = res;
      this.boardService.setBackgorundColor(this.board.backgroundColor);
    });
  }

  private updateCard(
    card: Card,
    position: Card['position'],
    listId: UpdateCardDto['listId']
  ) {
    this.cardService.update(card.id, { position, listId }).subscribe((res) => {
      console.log(res);
    });
  }

  // algoritmo para cerrar el formulario de las demas tarjetas activas
  openFormCard(list: List) {
    this.showCardForm = !this.showCardForm;
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map((item) => {
        if (item.id === list.id) {
          return {
            ...item,
            showCardForm: true,
          };
        }
        return {
          ...item,
          showCardForm: false,
        };
      });
    }
  }

  createList() {
    const title = this.inputList.value;
    if (this.board) {
      this.listService
        .create({
          title,
          boardId: this.board.id,
          position: this.boardService.getPositionNewItem(this.board.lists),
        })
        .subscribe((res) => {
          this.board?.lists.push({
            ...res,
            cards: [],
          });
          this.inputList.setValue('');
        });
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value;
    if (this.board) {
      this.cardService
        .create({
          title,
          listId: list.id,
          boardId: this.board.id,
          position: this.boardService.getPositionNewItem(list.cards),
        })
        .subscribe((res) => {
          list.cards.push(res);
          this.inputCard.setValue('');
        });
    }
  }

  closeCardForm(list: List) {
    list.showCardForm = false;
  }

  get colors() {
    if (this.board) {
      const classes = this.backgroundColors[this.board.backgroundColor];
      return classes ? classes : {};
    }
    return {};
  }
}
