import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  public ngOnInit(): void { }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Email:', this.loginForm.value.email);
      console.log('Password:', this.loginForm.value.password);
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.login(loginData);
    } else {
      console.log('Form is invalid');
    }
  }

  public login(data: {
    email: any;
    password: any;
  }) {
    this.authService.login(data.email, data.password).subscribe({
      next: (data) => {
        console.log(data, 'data');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error logging in', error);
      }
    });
  }

  public createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
