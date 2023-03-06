import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToDo } from 'src/app/models/todo.model';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from 'src/app/modules/boards/components/todo-dialog/todo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@app/models/board.model';
import { BoardsService } from '@app/services/boards.service';
import { Card } from '@app/models/card.model';

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
  faPlus = faPlus;
  isOpenBody = false;

  constructor(private dialog: Dialog,private route:ActivatedRoute,private boardService:BoardsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const id = params.get('id');
      if(id){
        this.getBoard(id);

      }
    })
  }

  board:Board | null = null;

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
    this.boardService.getPosition($event.container.data,$event.currentIndex)
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

  private getBoard(id:Board['id']){
    this.boardService.getBoard(id).subscribe((res)=>{
      this.board = res;
    })
  }
}
