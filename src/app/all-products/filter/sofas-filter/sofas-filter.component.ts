import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../model';
import {PaginationService} from '../../../shared/pagination.service';

@Component({
  selector: 'app-sofas-filter',
  templateUrl: './sofas-filter.component.html',
  styleUrls: ['./sofas-filter.component.css']
})

export class SofasFilterComponent implements OnInit {

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

  public filterSofasForm: FormGroup;

  constructor(public fb: FormBuilder,
              public paginationService: PaginationService) {
  }

  setPage(page: number, products: Product[]) {
    this.pager = this.paginationService.getPager(products.length, page);
    this.pagerChange.emit(this.pager);
    this.pagedItems = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItemsChange.emit(this.pagedItems);
  }

  initFilterSofasForm(): void {
    this.filterSofasForm = this.fb.group({
      typeInfo: this.fb.group({
        type1: '',
        type2: ''
      }),
      mechanismInfo: this.fb.group({
        mechanism1: '',
        mechanism2: ''
      }),
      lengthInfo: this.fb.group({
        minLength: ['', Validators.pattern(/[0-9]/)],
        maxLength: ['', Validators.pattern(/[0-9]/)]
      }),
      priceInfo: this.fb.group({
        minPrice: ['', Validators.pattern(/[0-9]/)],
        maxPrice: ['', Validators.pattern(/[0-9]/)]
      })
    });
  }

  filter(): void {
    let type1 = this.filterSofasForm.get('typeInfo.type1').value;
    let type2 = this.filterSofasForm.get('typeInfo.type2').value;
    type1 = (type1) ? 'straight' : '';
    type2 = (type2) ? 'corner' : '';
    if (!type1 && !type2) {
      type1 = 'straight';
      type2 = 'corner';
    }

    let mechanism1 = this.filterSofasForm.get('mechanismInfo.mechanism1').value;
    let mechanism2 = this.filterSofasForm.get('mechanismInfo.mechanism2').value;
    mechanism1 = (mechanism1) ? 'eurobook' : '';
    mechanism2 = (mechanism2) ? 'roll-out' : '';
    if (!mechanism1 && !mechanism2) {
      mechanism1 = 'eurobook';
      mechanism2 = 'roll-out';
    }

    let minLength = this.filterSofasForm.get('lengthInfo.minLength').value;
    let maxLength = this.filterSofasForm.get('lengthInfo.maxLength').value;
    minLength = minLength || 0;
    maxLength = maxLength || 99999;

    let minPrice = this.filterSofasForm.get('priceInfo.minPrice').value;
    let maxPrice = this.filterSofasForm.get('priceInfo.maxPrice').value;
    minPrice = minPrice || 0;
    maxPrice = maxPrice || 99999;

    let filteredProducts = this.products.filter(item => item.info.info.find(i => {
      if (i.name === 'Type' && (i.value === type1 || i.value === type2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if (i.name === 'Mechanism' && (i.value === mechanism1 || i.value === mechanism2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if (i.name === 'Price' && (i.value >= minPrice && i.value <= maxPrice)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if (i.name === 'Length' && (i.value >= minLength && i.value <= maxLength)) {
        return i;
      }
    }));

    this.setPage(1, filteredProducts);
    this.filteredProducts = JSON.parse(JSON.stringify(filteredProducts));
    this.filteredProductsChange.emit(this.filteredProducts);

    this.filterSofasForm.reset();
    this.show = 'products-filter';
    this.showChange.emit(this.show);
    this.close = !this.close;
    this.closeChange.emit(this.close);
  }

  ngOnInit(): void {
    this.initFilterSofasForm();
  }

}
