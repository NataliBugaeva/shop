import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(public router: Router,
              public route: ActivatedRoute) {
  }

  goToOrders() {
    this.router.navigate(['orders'], {relativeTo: this.route});
  }

  goToUser() {
    this.router.navigate(['user'], {relativeTo: this.route});
  }

  ngOnInit(): void {
  }

}
