import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: any;
  constructor(private http: HttpClient) { }

  getOrders(): void {
    this.http.get<any>(`/api/orders`).subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
  });
  }
}
