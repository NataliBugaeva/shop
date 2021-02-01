import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../model';
import {PaginationService} from '../../../shared/pagination.service';

@Component({
  selector: 'app-chairs-filter',
  templateUrl: './chairs-filter.component.html',
  styleUrls: ['./chairs-filter.component.css']
})
export class ChairsFilterComponent implements OnInit {

  @Input() products: any;
  @Input() filteredProducts: any;
  @Input() pager: any;
  @Input() pagedItems: any;
  @Input() show: any;
  @Input() close: any;

  @Output() filteredProductsChange = new EventEmitter<any>();
  @Output() pagedItemsChange = new EventEmitter<any>();
  @Output() pagerChange = new EventEmitter<any>();
  @Output() showChange = new EventEmitter<any>();
  @Output() closeChange = new EventEmitter<any>();

  public filterChairsForm: FormGroup;

  constructor(public fb: FormBuilder,
              public paginationService: PaginationService) {
  }

  setPage(page: number, products: Product[]) {
    console.log(this.filteredProducts);
    // возвращает объект pager Из paginationService
    this.pager = this.paginationService.getPager(products.length, page);
    this.pagerChange.emit(this.pager);
    // массив продуктов на текущей странице пагинации
    this.pagedItems = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItemsChange.emit(this.pagedItems);
  }

  initFilterChairsForm(): void {
    this.filterChairsForm = this.fb.group({
      chairsTypeInfo: this.fb.group({
        chairsType1: '',
        chairsType2: ''
      }),
      chairsWidthInfo: this.fb.group({
        minChairsWidth: ['', Validators.pattern(/[0-9]/)],
        maxChairsWidth: ['', Validators.pattern(/[0-9]/)]
      }),
      chairsDepthInfo: this.fb.group({
        minChairsDepth: ['', Validators.pattern(/[0-9]/)],
        maxChairsDepth: ['', Validators.pattern(/[0-9]/)]
      }),
      chairsPriceInfo: this.fb.group({
        minChairsPrice: ['', Validators.pattern(/[0-9]/)],
        maxChairsPrice: ['', Validators.pattern(/[0-9]/)]
      })
    });
  }

  filterChairs(): void {
    let chairsType1 = this.filterChairsForm.get('chairsTypeInfo.chairsType1').value;
    let chairsType2 = this.filterChairsForm.get('chairsTypeInfo.chairsType2').value;
    chairsType1 = (chairsType1) ? 'chair-bed' : '';
    chairsType2 = (chairsType2) ? 'interior' : '';
    if (!chairsType1 && !chairsType2) {
      chairsType1 = 'chair-bed';
      chairsType2 = 'interior';
    }

    let minChairsWidth = this.filterChairsForm.get('chairsWidthInfo.minChairsWidth').value;
    let maxChairsWidth = this.filterChairsForm.get('chairsWidthInfo.maxChairsWidth').value;
    minChairsWidth = minChairsWidth || 0;
    maxChairsWidth = maxChairsWidth || 99999;

    let minChairsDepth = this.filterChairsForm.get('chairsDepthInfo.minChairsDepth').value;
    let maxChairsDepth = this.filterChairsForm.get('chairsDepthInfo.maxChairsDepth').value;
    minChairsDepth = minChairsDepth || 0;
    maxChairsDepth = maxChairsDepth || 99999;

    let minChairsPrice = this.filterChairsForm.get('chairsPriceInfo.minChairsPrice').value;
    let maxChairsPrice = this.filterChairsForm.get('chairsPriceInfo.maxChairsPrice').value;
    minChairsPrice = minChairsPrice || 0;
    maxChairsPrice = maxChairsPrice || 99999;

    console.log(chairsType1, chairsType2);
    console.log(this.products);

    let filteredProducts = this.products.filter(item => item.info.info.find(i => {
      if (i.name === 'Type' && (i.value === chairsType1 || i.value === chairsType2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if (i.name === 'Width' && (i.value >= minChairsWidth && i.value <= maxChairsWidth)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if (i.name === 'Depth' && (i.value >= minChairsDepth && i.value <= maxChairsDepth)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if (i.name === 'Price' && (i.value >= minChairsPrice && i.value <= maxChairsPrice)) {
        return i;
      }
    }));
    console.log(filteredProducts);
    this.setPage(1, filteredProducts);
    this.filteredProducts = JSON.parse(JSON.stringify(filteredProducts));
    this.filteredProductsChange.emit(this.filteredProducts);

    console.log(this.products, filteredProducts);
    this.filterChairsForm.reset();
    this.show = 'products-filter';
    this.showChange.emit(this.show);
    this.close = !this.close;
    this.closeChange.emit(this.close);
    console.log(this.show);
  }

  ngOnInit(): void {
    this.initFilterChairsForm();
  }

}
