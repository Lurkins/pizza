import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  login(payload: LoginPayload): void {
    if (payload) {
      this.http.post<Token>(`/api/auth`, payload).subscribe(
        token => {
          localStorage.setItem('access_token', token.access_token);
          this.router.navigate(['order']);
        },
        error => console.log('Error', error)
      );
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null ? true : false;
  }
}
