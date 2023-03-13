import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  faClose,
  faCheckToSlot,
  faBars,
  faArrowRight,
  faCopy,
  faArchive,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '@app/models/card.model';
import { CardsService } from '@app/services/cards.service';
import { FormControl, Validators } from '@angular/forms';
import { List } from '@app/models/list.model';
import { Board } from '@app/models/board.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

interface InputData {
  card: Card;
  list: List;
  boardId: Board['id'];
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styles: [
    `
      input::placeholder {
        color: gray;
        font-size: 16px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
      }
    `,
  ],
})
export class TodoDialogComponent {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faArrowRight = faArrowRight;
  faCopy = faCopy;
  faArchive = faArchive;
  faShareNodes = faShareNodes;

  inputDescription: FormControl<string>;
  inputTitle: FormControl<string>;
  openInput = false;
  isOpenOverlayMove = false;
  isOpenOverlayMoveBtn = false;
  isOpenOverlayCopy = false;
  card: Card;
  title: List['title'];
  list: List;
  boardId: Board['id'];

  constructor(
    private cardService: CardsService,
    private overlay: Overlay,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.card = data.card;
    this.list = data.list;
    this.boardId = data.boardId;
    if (this.card.description) {
      this.inputDescription = new FormControl<string>(this.card.description, {
        nonNullable: true,
        validators: [Validators.required],
      });
    } else {
      this.inputDescription = new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      });
    }
    this.inputTitle = new FormControl<string>(this.card.title, {
      nonNullable: true,
      validators: [Validators.required],
    });
  }

  updateDescription() {
    if (this.card) {
      console.log('hola');
      const description = this.inputDescription.getRawValue();
      this.cardService
        .update(this.card.id, { description })
        .subscribe((res) => {
          this.openInput = !this.openInput;
          this.card.description = description;
        });
    }
  }

  updateTitle() {
    if (this.card && this.inputTitle.valid) {
      const title = this.inputTitle.getRawValue();
      this.cardService.update(this.card.id, { title }).subscribe((res) => {
        this.card.title = title;
      });
    }
  }

  get colorBtnDescription() {
    if (this.card.description) {
      return 'bg-transparent';
    } else {
      return 'bg-gray-200';
    }
  }

  get styleInputTitle() {
    if (this.inputTitle.valid) {
      return 'bg-transparent border-none';
    } else {
      return 'bg-white border-2 border-blue-600';
    }
  }

  close() {
    this.dialogRef.close({
      rta: false,
    });
  }

  closeOverlayMove() {
    this.isOpenOverlayMove = false;
    this.isOpenOverlayMoveBtn = false;
  }

  closeOverlayCopy(){
    this.isOpenOverlayCopy = false;
  }
}
