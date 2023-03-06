import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BtnComponent } from './components/btn/btn.component';
import { CardColorComponent } from './components/card-color/card-color.component';

@NgModule({
  declarations: [BtnComponent, CardColorComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [BtnComponent, CardColorComponent],
})
export class SharedModule {}
