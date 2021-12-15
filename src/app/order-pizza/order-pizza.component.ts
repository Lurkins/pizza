import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order, OrderService } from '../order.service';

interface Flavors {
  [key: string]: string;
}

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.scss']
})
export class OrderPizzaComponent implements OnInit, OnDestroy {

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
  refreshOrders$ = new BehaviorSubject<boolean>(true);
  activeFlavor = 'crust';
  activeSize = 'M';
  activeCrust = 'regular';
  submitSuccess = false;
  deleteSuccess = false;
  submitError = false;
  isSaving = false;
  isLoadingList = false;
  flavors: Flavors = {
    CHEESE: 'three-cheese',
    SUPREME: 'supreme',
    VEGGIE: 'veggie',
    SICILIAN: 'sicilian',
    GARDEN: 'garden',
    PROSCIUTTO: 'prosciutto'
  };
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.orders$ = this.refreshOrders$.pipe(switchMap(_ => this.orderService.getOrders()));

    const flavorSubscription = this.flavor?.valueChanges.subscribe(flavor => {
      this.activeFlavor = this.flavors[flavor];
    });
    this.subscription.add(flavorSubscription);

    const sizeSubscription = this.size?.valueChanges.subscribe(size => {
      this.activeSize = size;
    });
    this.subscription.add(sizeSubscription);

    const crustSubscription = this.crust?.valueChanges.subscribe(crust => {
      this.activeCrust = crust;
    });
    this.subscription.add(crustSubscription);
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
    const orderSubscription = this.orderService.createOrder(this.pizzaForm.value).subscribe(
      () => {
        this.refreshOrders$.next(true);
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
    this.subscription.add(orderSubscription);
  }

  deleteOrder(orderId: number): void {
    const deleteSubscription = this.orderService.deleteOrder(orderId).subscribe(
      () => {
        this.refreshOrders$.next(true);
        this.deleteSuccess = true;
        setTimeout(() => this.deleteSuccess = false, 3200);
      },
      err => {
        this.router.navigate(['error'], {state: {errorMsg: err}});
      }
    );
    this.subscription.add(deleteSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
