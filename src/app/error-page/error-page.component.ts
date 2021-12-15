import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorMsg = '';
  constructor(private router: Router) {
    this.errorMsg = this.router.getCurrentNavigation()?.extras.state?.errorMsg;
   }

  ngOnInit(): void {

  }

}
