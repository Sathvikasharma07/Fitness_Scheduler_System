import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() registerSuccess = new EventEmitter<void>();
  
  userData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.register(this.userData).subscribe(
      response => {
        console.log('Registration successful', response);
        alert('Registration successful! Please login.');
        this.registerSuccess.emit();
      },
      error => {
        console.error('Registration failed', error);
        alert('Registration failed: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }
}