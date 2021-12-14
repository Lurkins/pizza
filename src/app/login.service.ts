import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface LoginPayload {
  username: string;
  password: string;
}

interface Token {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private logged = new BehaviorSubject<boolean>(false);
  public isLogged: Observable<boolean> = this.logged.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(payload: LoginPayload): void {
    if (payload) {
      this.http.post<Token>(`/api/auth`, payload).subscribe(
        token => {
          localStorage.setItem('access_token', token.access_token);
          this.logged.next(true);
          this.router.navigate(['orders']);
        },
        error => {
          this.router.navigate(['error'], {state: {errorMsg: error}});
        }
      );
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.checkStatus();
    this.router.navigate(['']);
  }

  checkStatus(): void {
    if (localStorage.getItem('access_token')) {
      this.logged.next(true);
    } else {
      this.logged.next(false);
    }
  }

  // get isLoggedIn(): any {
  //   return this.isLogged;
  //   // return localStorage.getItem('access_token') !== null ? true : false;
  // }
}
