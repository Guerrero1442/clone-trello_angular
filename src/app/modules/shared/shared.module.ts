import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BtnComponent } from './components/btn/btn.component';

@NgModule({
  declarations: [BtnComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [BtnComponent],
})
export class SharedModule {}
