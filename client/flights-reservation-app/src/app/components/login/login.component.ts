import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm!: FormGroup;

  constructor(private authService: AuthService){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value); 
      
      const email = this.loginForm.get('email')?.value; 
      const password = this.loginForm.get('password')?.value; 
      
      console.log('Email:', email); 
      console.log('Password:', password); 
      
      this.authService.login(new User(email, password));

    } else {
      console.error('Form is invalid');
    }
  }
  
}
