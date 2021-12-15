import { Component, Input } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isLoggedIn = false;
  constructor(private loginService: LoginService) { }

  handleLogout(): void {
    this.loginService.logout();
  }
}
