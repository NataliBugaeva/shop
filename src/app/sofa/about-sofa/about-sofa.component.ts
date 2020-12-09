import { Component, OnInit } from '@angular/core';

import {CommonService} from '../../shared/common.service';

import {ActivatedRoute} from '@angular/router';

import {Sofa} from '../../../model';


@Component({
  selector: 'app-about-sofa',
  templateUrl: './about-sofa.component.html',
  styleUrls: ['./about-sofa.component.css']
})
export class AboutSofaComponent implements OnInit {

  public sofaId: string;
  public chosenSofa: Sofa;
  public amount: number = 1;
  public comparison: boolean = false;
  public switch: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private service: CommonService) {

  }

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
    const sofaId: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.getSofaId(sofaId).subscribe( (result: Sofa) => {
      this.chosenSofa = result;
    });


  }
}
