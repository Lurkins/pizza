import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderService } from '../order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  handleDeleteOrder(): void {
    this.orderService.deleteOrder(this.order.Order_ID);
  }

}
