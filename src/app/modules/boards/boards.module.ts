import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { MoveOverlayComponent } from './components/move-overlay/move-overlay.component';
import { CopyOverlayComponent } from './components/copy-overlay/copy-overlay.component';

@NgModule({
  declarations: [BoardsComponent, BoardComponent, TodoDialogComponent, MoveOverlayComponent, CopyOverlayComponent],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    SharedModule,
    DragDropModule,
    CdkAccordionModule,
    DialogModule,
    FontAwesomeModule,
    OverlayModule,
    ReactiveFormsModule
  ],
})
export class BoardsModule {}
