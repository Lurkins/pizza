import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.scss']
})
export class OrderPizzaComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) { }
  pizzaForm = this.fb.group({
    Size: ['', Validators.required],
    Crust: ['', Validators.required],
    Flavor: ['', Validators.required],
    Table_No: ['', Validators.required],
  });
  submitSuccess = false;
  submitError = false;
  isLoading = false;

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.loginService.logout();
  }

  onSubmitPizza(): void {
    this.isLoading = true;
    this.submitSuccess = false;
    this.orderService.createOrder(this.pizzaForm.value).subscribe(
      order => {
        this.isLoading = false;
        this.submitSuccess = true;
        this.pizzaForm.reset();
        setTimeout(() => this.submitSuccess = false, 3200);
      },
      error => console.log('Error', error)
    );
  }

}
