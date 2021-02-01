import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model';
import {AuthenticationService} from '../shared/authentication.service';
import {Subscription} from 'rxjs';
import {CommonService} from '../shared/common.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  public basketProducts: Product[];
  public totalCost: number;
  public email: string;
  //это Id usera в базе
  public userId: string;
  public docId: string;
  public subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.user().subscribe(res => {
        this.email = res?.email;
        this.userId = res?.uid;
        this.subscriptions.push(
          this.commonService.getUser(this.userId).subscribe(res => {
            this.basketProducts = res[0]?.info.basket;
            this.docId = res[0]?.id;
            if (this.basketProducts?.length) {
              this.totalCost = this.basketProducts.map((item: Product) => item.info.info.find(i => i.name === 'Price').value *
                item.info.info.find(i => i.name === 'Amount').value)
                .reduce((sum: number, item: number) => sum + item);
              console.log(this.totalCost);
            }
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
