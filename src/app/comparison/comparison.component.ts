import {Component, OnInit} from '@angular/core';
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
  public characteristics: Array<{ name: string }>;

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.product = JSON.parse(localStorage.getItem('lastPath'));
    this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
    this.productsToCompare = this.productsFromComparison[this.product];

    this.infoToShow = this.productsToCompare.map(item => {
      const img = {name: 'Image', value: item.info.images.find(i => i.name === 'imgSmall').value};
      const info = item.info.info;
      const id = {name: 'id', value: item.id};
      info.unshift(img);
      info.push(id);
      return info;
    });
    // это массив из наименования характеристик
    this.characteristics = this.infoToShow[0].map(item => ({name: item.name}));
  }

}
