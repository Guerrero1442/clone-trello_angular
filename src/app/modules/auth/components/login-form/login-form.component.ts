import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from '@app/models/request-status';
import { AuthService } from '@app/services/auth.service';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      const { email } = params;
      if (email) {
        this.form.patchValue({ email });
      }
    });
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app']);
        },
        error: () => {
          this.status = 'error';
        },
      });
      // TODO
    } else {
      this.form.markAllAsTouched();
    }
  }
}
