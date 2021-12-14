import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedIn = false;
  constructor(private loginService: LoginService ) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.loginService.logout();
  }
}
