import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order, OrderService } from '../order.service';

interface Flavors {
  [key: string]: string;
}

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.scss']
})
export class OrderPizzaComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  pizzaForm = this.fb.group({
    Size: ['', Validators.required],
    Crust: ['', Validators.required],
    Flavor: ['', Validators.required],
    Table_No: ['', Validators.required],
  });
  orders$!: Observable<Order[]>;
  activeFlavor = 'crust';
  activeSize = 'M';
  activeCrust = 'regular';
  submitSuccess = false;
  submitError = false;
  isSaving = false;
  errorMsg = '';
  flavors: Flavors = {
    CHEESE: 'three-cheese',
    SUPREME: 'supreme',
    VEGGIE: 'veggie',
    SICILIAN: 'sicilian',
    GARDEN: 'garden',
    PROSCIUTTO: 'prosciutto'
  };

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();

    this.flavor?.valueChanges.subscribe(flavor => {
      this.activeFlavor = this.flavors[flavor];
    });
    this.size?.valueChanges.subscribe(size => {
      this.activeSize = size;
    });
    this.crust?.valueChanges.subscribe(crust => {
      this.activeCrust = crust;
    });
  }

  get size(): AbstractControl | null {
    return this.pizzaForm.get('Size');
  }

  get crust(): AbstractControl | null {
    return this.pizzaForm.get('Crust');
  }

  get flavor(): AbstractControl | null {
    return this.pizzaForm.get('Flavor');
  }

  onSubmitPizza(): void {
    this.isSaving = true;
    this.submitSuccess = false;
    this.orderService.createOrder(this.pizzaForm.value).subscribe(
      () => {
        this.orders$ = this.orderService.getOrders();
        this.isSaving = false;
        this.submitSuccess = true;
        this.pizzaForm.reset();
        this.activeFlavor = 'crust';
        this.activeSize = 'M';
        setTimeout(() => this.submitSuccess = false, 3200);
      },
      err => {
        this.isSaving = false;
        this.submitSuccess = false;
        this.router.navigate(['error'], {state: {errorMsg: err}});
      }
    );
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        this.orders$ = this.orderService.getOrders();
      },
      err => {
        this.router.navigate(['error'], {state: {errorMsg: err}});
      }
    );
  }
}
