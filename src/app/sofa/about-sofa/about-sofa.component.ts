import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../shared/common.service';
import {ActivatedRoute} from '@angular/router';
import {Sofa} from '../../../model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-about-sofa',
  templateUrl: './about-sofa.component.html',
  styleUrls: ['./about-sofa.component.css']
})

export class AboutSofaComponent implements OnInit, OnDestroy {

  /*public sofaId: string;*/
  public chosenSofa: Sofa;
  public amount: number = 1;
  public comparison: boolean = false;
  public switch: boolean = true;
  public subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private service: CommonService) {

  }

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
    const sofaId: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.subscriptions.push(
      this.service.getSofaId(sofaId).subscribe( (result: Sofa) => {
        this.chosenSofa = result;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
