import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BtnComponent } from './components/btn/btn.component';
import { CardColorComponent } from './components/card-color/card-color.component';
import { MiniCardComponent } from './components/mini-card/mini-card.component';

@NgModule({
  declarations: [BtnComponent, CardColorComponent, MiniCardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [BtnComponent, CardColorComponent, MiniCardComponent],
})
export class SharedModule {}
