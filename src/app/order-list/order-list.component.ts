import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() orders!: Observable<Order[]>;
  constructor() { }

  ngOnInit(): void {
  }
}
