import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToDo } from 'src/app/models/todo.model';
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
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
    `,
  ],
})
export class BoardComponent implements OnInit {
  // icons
  faEllipsisH = faEllipsisH;
  faEllipsis = faEllipsis;
  faPlus = faPlus;
  faX = faX;
  isOpenBody = false;
  showCardForm = false;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private cardService: CardsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  board: Board | null = null;
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  isOpen: boolean[] = Array(this.board?.lists.length).fill(false);

  drop($event: CdkDragDrop<Card[]>) {
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

  // addColumn() {
  //   this.columns.push({
  //     title: 'New Column',
  //     todos: [],
  //   });
  // }

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

  createCard(list: List) {
    const title = this.inputCard.value;
    if (this.board) {
      this.cardService
        .create({
          title,
          listId: list.id,
          boardId: this.board.id,
          position: this.boardService.getPositionNewCard(list.cards),
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
}
