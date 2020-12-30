import { Component, OnInit } from '@angular/core';
import {Product} from '../../model';
import {CommonService} from '../shared/common.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  public product: string;

  // продукты, которые находятся в LS для сравнения из всех категорий
  public productsFromComparison: any;

  // продукты, которые отображаем в сравнении
  public productsToCompare: Product[];
  public infoToShow: any[];

  // наименование характеристик продуктов, отображаемых в сравнении
  public characteristics: string[];

  constructor(private commonService: CommonService) { }

/*  clickSofas(): void {
    this.product = 'sofas';
  }

  clickChairs(): void {
    this.product = 'chairs';
  }

  clickTables(): void {
    this.product = 'tables';
    alert('yf;fkf');
  }*/

  ngOnInit(): void {
    this.product = JSON.parse(localStorage.getItem('lastPath'));
    this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
    console.log(this.productsFromComparison);

    for (let key in this.productsFromComparison) {
      if ((key === this.product) && (this.productsFromComparison[key].length >= 2)) {
        this.productsToCompare = this.productsFromComparison[key];
        this.infoToShow = this.productsToCompare.map( item => {
          let img = {name: 'Изображение', value: item.info.images.find( i => i.name === 'imgSmall').value};
          let info = item.info.info;
          info.unshift(img);
          return info;
        });
        console.log(this.infoToShow);
        this.characteristics = this.infoToShow[0].map( item => ({name: item.name, value: item.name}));
        this.infoToShow.unshift(this.characteristics);
        console.log(this.infoToShow);
      }
    }


  }

}
