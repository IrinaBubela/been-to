import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Email:', this.signupForm.value.email);
      console.log('Password:', this.signupForm.value.password);
    } else {
      console.log('Form is invalid');
    }
  }
}
