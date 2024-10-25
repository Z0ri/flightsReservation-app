import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent{
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.signupForm = new FormGroup({
      firstName: new FormControl<string>('', [Validators.maxLength(12), Validators.required]),
      lastName: new FormControl<string>('', [Validators.maxLength(12), Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', Validators.required)
    });
  }

  signUp(){
    this.authService.signUp(new User(
      this.signupForm.get('email')?.value,
      this.signupForm.get('password')?.value,
      this.signupForm.get('firstName')?.value,
      this.signupForm.get('lastName')?.value
    ));
  }
}
