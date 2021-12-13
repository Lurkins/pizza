import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { Order, OrderService } from '../order.service';
declare const bootstrap: any;

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
  orders$!: Observable<Order[]>;
  submitSuccess = false;
  submitError = false;
  isSaving = false;
  errorMsg = '';
  modal!: { show: () => void; };

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
    this.modal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    });
  }

  handleLogout(): void {
    this.loginService.logout();
  }

  onSubmitPizza(): void {
    this.isSaving = true;
    this.submitSuccess = false;
    this.orderService.createOrder(this.pizzaForm.value).subscribe(
      order => {
        this.orders$ = this.orderService.getOrders();
        this.isSaving = false;
        this.submitSuccess = true;
        this.pizzaForm.reset();
        setTimeout(() => this.submitSuccess = false, 3200);
      },
      err => {
        this.isSaving = false;
        this.submitSuccess = false;
        console.log(err.status);
        if (err.error.msg) {
          this.errorMsg = err.error.msg;
        }

        if (err.error.detail) {
          this.errorMsg = err.error.detail;
        }
        this.modal.show();
      }
    );
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        this.orders$ = this.orderService.getOrders();
      },
      err => {
        if (err.error.msg) {
          this.errorMsg = err.error.msg;
        }

        if (err.error.detail) {
          this.errorMsg = err.error.detail;
        }
        this.modal.show();
      }
    );
  }
}
