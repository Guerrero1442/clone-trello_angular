import { Component, Input } from '@angular/core';
import { Colors, COLORS } from '@app/models/colors.model';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
})
export class MiniCardComponent {
  @Input() color: Colors = 'sky';
  mapColors = COLORS;

  constructor() {}

  get colors() {
    const classes = this.mapColors[this.color];
    return classes ? classes : {};
  }
}
