import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
})
export class BtnComponent {
  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'submit';
  @Input() colorBtn:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light'
    | 'danger' = 'primary';

  get colors() {
    return {
      'bg-success-700': this.colorBtn === 'success',
      'hover:bg-success-800': this.colorBtn === 'success',
      'focus:ring-success-300': this.colorBtn === 'success',
      'bg-primary-700': this.colorBtn === 'primary',
      'hover:bg-primary-800': this.colorBtn === 'primary',
      'focus:ring-primary-300': this.colorBtn === 'primary',
      'bg-secondary-700': this.colorBtn === 'secondary',
      'hover:bg-secondary-800': this.colorBtn === 'secondary',
      'focus:ring-secondary-300': this.colorBtn === 'secondary',
      'bg-info-700': this.colorBtn === 'info',
      'hover:bg-info-800': this.colorBtn === 'info',
      'focus:ring-info-300': this.colorBtn === 'info',
      'bg-warning-700': this.colorBtn === 'warning',
      'hover:bg-warning-800': this.colorBtn === 'warning',
      'focus:ring-warning-300': this.colorBtn === 'warning',
      'bg-danger-700': this.colorBtn === 'danger',
      'hover:bg-danger-800': this.colorBtn === 'danger',
      'focus:ring-danger-300': this.colorBtn === 'danger',
      'bg-dark-700': this.colorBtn === 'dark',
      'hover:bg-dark-800': this.colorBtn === 'dark',
      'focus:ring-dark-300': this.colorBtn === 'dark',
      'bg-light-700': this.colorBtn === 'light',
      'hover:bg-light-800': this.colorBtn === 'light',
      'focus:ring-light-300': this.colorBtn === 'light',
    };
  }
}
