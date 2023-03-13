import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '@app/models/colors.model';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
})
export class BtnComponent {
  faSpinner = faSpinner;

  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: Colors = 'primary';
  @Input() text_align: 'text-left' | 'text-center' | 'text-right' = 'text-center';

  mapColors = COLORS;

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }



}
