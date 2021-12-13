import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderService } from '../order.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  @Output() deleteOrderEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  handleDeleteOrder(): void {
    this.deleteOrderEvent.emit(this.order.Order_ID);
  }


}
