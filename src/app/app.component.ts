import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login-service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'pizza';
  isLoggedIn = false;
  subscription: Subscription = new Subscription();

  constructor(public loginService: LoginService) {
    const loginSubscription = this.loginService.isLogged.subscribe(logged => {
      this.isLoggedIn = logged;
    });
    this.subscription.add(loginSubscription);
    this.loginService.checkStatus();
   }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
