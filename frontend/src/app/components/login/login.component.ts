import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful', response);
        this.loginSuccess.emit();
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed: ' + (error.error?.message || 'Invalid credentials'));
      }
    );
  }
}