import { Component, OnInit } from '@angular/core';
import {Chair, Table} from '../../../model';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/common.service';

@Component({
  selector: 'app-about-table',
  templateUrl: './about-table.component.html',
  styleUrls: ['./about-table.component.css']
})
export class AboutTableComponent implements OnInit {

  public tableId: string;
  public chosenTable: Table;
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
    const tableId: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.getTableId(tableId).subscribe( (result: Table) => {
      this.chosenTable = result;
    });

  }

}
