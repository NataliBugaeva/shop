import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chair} from '../../../model';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-about-chair',
  templateUrl: './about-chair.component.html',
  styleUrls: ['./about-chair.component.css']
})
export class AboutChairComponent implements OnInit, OnDestroy {

  public chairId: string;
  public chosenChair: Chair;
  public amount: number = 1;
  public comparison: boolean = false;
  public switch: boolean = true;
  public subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private service: CommonService) { }

  // увеличиваем количество товара
  enlargeAmount = (): void => {
    this.amount = this.amount + 1;
  }

  // уменьшаем количество товара
  decreaseAmount = (): void => {
    this.amount === 1 ? this.amount = 1 : this.amount = this.amount - 1;
  }

  // переключаемся с отзывов на характеристики
  changeSwitch = (): void => {
    this.switch = !this.switch;
  }

  ngOnInit(): void {

    // выцепили id из урла
    const chairId: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.subscriptions.push(
      this.service.getChairId(chairId).subscribe( (result: Chair) => {
        this.chosenChair = result;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( (subscription) => {
      subscription.unsubscribe();
    });
  }

}
