import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from '@app/models/request-status';
import { AuthService } from '@app/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from 'src/app/utils/validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
      this.authService.registerAndLogin(name, email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app']);
        },
        error: () => {
          this.status = 'error';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateEmail() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      console.log(email);
      this.authService.isAvailable(email).subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.form.controls.email.setValue(email);
            this.showRegister = true;
          } else {
            this.router.navigate(['/login'], {
              queryParams: { email },
            });
          }
        },
        error: () => {
          this.statusUser = 'error';
        },
      });
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
