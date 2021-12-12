import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Order {
  Crust: string;
  Flavor: string;
  Order_ID: number;
  Size: string;
  Table_No: number;
  Timestamp: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [];
  constructor(private http: HttpClient) { }

  getOrders(): void {
    this.http.get<Order[]>(`/api/orders`).subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

  createOrder(pizzaOrder: Order): void {
    const token = localStorage.getItem('access_token');
    if (pizzaOrder && token) {
      // Convert table number from string to number
      const payload = { ...pizzaOrder, Table_No: +pizzaOrder.Table_No };
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      };
      this.http.post<Order>(`/api/orders`, payload, httpOptions).subscribe(
        res => {
          console.log(res);
        },
        error => console.log('Error', error)
      );
    }
  }
}
