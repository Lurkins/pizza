import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
      this.loginService.login(this.loginForm.value);
  }

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }
  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

}
