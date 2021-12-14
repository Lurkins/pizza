import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'orders', component: OrderPizzaComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
