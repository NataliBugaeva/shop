import { Component, OnInit } from '@angular/core';
import {Chair} from '../../../model';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/common.service';

@Component({
  selector: 'app-about-chair',
  templateUrl: './about-chair.component.html',
  styleUrls: ['./about-chair.component.css']
})
export class AboutChairComponent implements OnInit {

  public chairId: string;
  public chosenChair: Chair;
  public amount: number = 1;
  public comparison: boolean = false;
  public switch: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private service: CommonService) { }

  // увеличиваем количество товара
  enlargeAmount = () => {
    this.amount = this.amount + 1;
  }

  // уменьшаем количество товара
  decreaseAmount = () => {
    this.amount === 1 ? this.amount = 1 : this.amount = this.amount - 1;
  }

  // переключаемся с отзывов на характеристики
  changeSwitch = () => {
    this.switch = !this.switch;
  }

  ngOnInit(): void {

    // выцепили id из урла
    const chairId: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.getChairId(chairId).subscribe( (result: Chair) => {
      this.chosenChair = result;
    });
  }

}
