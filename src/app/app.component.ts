import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizza';
  isLoggedIn = false;
  constructor(public loginService: LoginService){
    this.loginService.isLogged.subscribe(logged => {
      this.isLoggedIn = logged;
    });
    this.loginService.checkStatus();
   }
}
