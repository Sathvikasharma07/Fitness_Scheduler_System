import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fitness Class Scheduler';
  showLogin = true;
  isLoggedIn = false;
  activeTab = 'schedule';

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLoginSuccess() {
    this.isLoggedIn = true;
  }

  onRegisterSuccess() {
    this.showLogin = true;
    alert('Registration successful! Please login with your credentials.');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}