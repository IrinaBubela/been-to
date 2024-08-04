import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  public ngOnInit(): void { }

  public passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { 'mismatch': true };
  }

  public onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Email:', this.signupForm.value.email);
      console.log('Password:', this.signupForm.value.password);
      const signupData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }
      this.signup(signupData);
    } else {
      console.log('Form is invalid');
    }
  }

  public signup(data: {
    email: any;
    password: any;
  }) {
    this.authService.signup(data.email, data.password)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = 'Signup failed';
        }
      );
  }
}
