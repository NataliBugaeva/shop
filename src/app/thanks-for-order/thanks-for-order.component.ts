import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thanks-for-order',
  templateUrl: './thanks-for-order.component.html',
  styleUrls: ['./thanks-for-order.component.css']
})
export class ThanksForOrderComponent implements OnInit {

  constructor(public router: Router) { }

  goToAccount(): void {
    this.router.navigateByUrl('/account/orders');
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
  }

}
