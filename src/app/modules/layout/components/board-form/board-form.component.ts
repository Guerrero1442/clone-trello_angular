import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Colors, COLORS } from '@app/models/colors.model';
import { BoardsService } from '@app/services/boards.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styles: [
    `
      [type='radio']:checked {
        background-image: url('../../../../../assets/svg/check.svg');
      }
    `,
  ],
})
export class BoardFormComponent {
  faCheck = faCheck;
  mapColors = COLORS;
  @Output() closeOverlay = new EventEmitter<boolean>();


  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardsService,
    private router:Router
  ) {}

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      this.boardService.createBoard(title, backgroundColor).subscribe(res => {
        this.closeOverlay.next(false);
        this.router.navigate(['/app/boards',res.id])
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get colors() {
    if (this.form.value.backgroundColor) {
      const colors = this.mapColors[this.form.value.backgroundColor];
      return colors;
    }
    return {};
  }

  get titleField() {
    return this.form.get('title');
  }
}
