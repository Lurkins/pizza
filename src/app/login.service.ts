import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(): any {
    const testLogin = {
      username: 'test',
      password: 'test'
    };
    this.http.post(`/api/auth`, testLogin).subscribe(res => console.log(res));

  }
}
