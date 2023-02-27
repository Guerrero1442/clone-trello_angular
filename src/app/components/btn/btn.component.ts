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
    | 'gray'
    | 'danger' = 'primary';

  mapColor = {
    success: {
      'bg-success-700': true,
      'hover:bg-success-800': true,
      'focus:ring-success-300': true,
      'text-white': true,
    },
    primary: {
      'bg-primary-700': true,
      'hover:bg-primary-800': true,
      'focus:ring-primary-300': true,
      'text-white': true,
    },
    secondary: {
      'bg-secondary-700': true,
      'hover:bg-secondary-800': true,
      'focus:ring-secondary-300': true,
      'text-white': true,
    },
    info: {
      'bg-info-700': true,
      'hover:bg-info-800': true,
      'focus:ring-info-300': true,
      'text-white': true,
    },
    warning: {
      'bg-warning-700': true,
      'hover:bg-warning-800': true,
      'focus:ring-warning-300': true,
      'text-white': true,
    },
    danger: {
      'bg-danger-700': true,
      'hover:bg-danger-800': true,
      'focus:ring-danger-300': true,
      'text-white': true,
    },
    dark: {
      'bg-dark-700': true,
      'hover:bg-dark-800': true,
      'focus:ring-dark-300': true,
      'text-white': true,
    },
    light: {
      'bg-light-700': true,
      'hover:bg-light-800': true,
      'focus:ring-light-300': true,
      'text-black': true,
    },
    gray: {
      'bg-gray-200': true,
      'hover:bg-gray-300': true,
      'focus:ring-gray-300': true,
      'text-gray-700': true,
    },
  };

  get colors() {
    const colors = this.mapColor[this.colorBtn];
    if (colors) {
      return colors;
    }
    return {};
  }
}
