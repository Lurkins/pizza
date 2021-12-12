import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public loginService: LoginService,
    public router: Router
  ){ }

  canActivate(): boolean {
    if (this.loginService.isLoggedIn !== true) {
      this.router.navigate(['']);
    }
    return true;
  }
}