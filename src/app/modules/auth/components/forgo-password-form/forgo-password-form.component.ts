import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from '@app/models/request-status';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-forgo-password-form',
  templateUrl: './forgo-password-form.component.html',
})
export class ForgoPasswordFormComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;
  token = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery(email).subscribe({
        next: (rta) => {
          this.status = 'success';
          this.emailSent = true;
          this.token = rta.recoveryToken;
          console.log(this.token);
        },
        error: () => {
          this.status = 'error';
        },
      });
      // TODO: Connect
    } else {
      this.form.markAllAsTouched();
    }
  }

  recoveryPassword() {
    if (this.status === 'success') {
      this.router.navigate(['/recovery'], {
        queryParams: {
          token: this.token,
        },
      });
    }
  }
}
