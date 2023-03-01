import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from '@app/models/request-status';
import { AuthService } from '@app/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from 'src/app/utils/validator';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const { token } = params;
      if (token) {
        this.token = token;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.authService.changePassword(this.token, newPassword).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login']);
        },
        error: () => {
          this.status = 'error';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
