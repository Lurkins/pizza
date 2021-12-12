import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`/api/orders`);
  }

  createOrder(pizzaOrder: Order): Observable<Order> {
    const token = localStorage.getItem('access_token');
    const payload = { ...pizzaOrder, Table_No: +pizzaOrder.Table_No };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.post<Order>(`/api/orders`, payload, httpOptions);
  }

  deleteOrder(orderId: number): any {
    const token = localStorage.getItem('access_token');
    if (orderId && token) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      };
      this.http.delete(`/api/orders/${orderId}`, httpOptions).subscribe(
        res => {
          console.log(res);
        },
        error => console.log('Error', error)
      );
    }
  }
}
