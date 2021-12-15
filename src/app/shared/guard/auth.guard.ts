import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public loginService: LoginService,
    public router: Router
  ){ }

  canActivate(): boolean {
    if (localStorage.getItem('access_token') == null)   {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
