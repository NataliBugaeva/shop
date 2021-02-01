import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../model';
import {PaginationService} from '../../../shared/pagination.service';

@Component({
  selector: 'app-tables-filter',
  templateUrl: './tables-filter.component.html',
  styleUrls: ['./tables-filter.component.css']
})
export class TablesFilterComponent implements OnInit {

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

  public filterTablesForm: FormGroup;

  constructor(public fb: FormBuilder,
              public paginationService: PaginationService) { }

  setPage(page: number, products: Product[]) {
    console.log(this.filteredProducts);
    // возвращает объект pager Из paginationService
    this.pager = this.paginationService.getPager(products.length, page);
    this.pagerChange.emit(this.pager);
    // массив продуктов на текущей странице пагинации
    this.pagedItems = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItemsChange.emit(this.pagedItems);
  }

  initFilterTablesForm(): void {
    this.filterTablesForm = this.fb.group({
      tablesTypeInfo: this.fb.group({
        tablesType1: '',
        tablesType2: ''
      }),
      tablesShapeInfo: this.fb.group({
        tablesShape1: '',
        tablesShape2: ''
      }),
      tablesWidthInfo: this.fb.group({
        minTablesWidth: ['', Validators.pattern(/[0-9]/)],
        maxTablesWidth: ['', Validators.pattern(/[0-9]/)]
      }),
      tablesHeightInfo: this.fb.group({
        minTablesHeight: ['', Validators.pattern(/[0-9]/)],
        maxTablesHeight: ['', Validators.pattern(/[0-9]/)]
      }),
      tablesPriceInfo: this.fb.group({
        minTablesPrice: ['', Validators.pattern(/[0-9]/)],
        maxTablesPrice: ['', Validators.pattern(/[0-9]/)]
      })
    });
  }

  filterTables(): void {
    let tablesType1 = this.filterTablesForm.get('tablesTypeInfo.tablesType1').value;
    let tablesType2 = this.filterTablesForm.get('tablesTypeInfo.tablesType2').value;
    tablesType1 = (tablesType1) ? 'table-book' : '';
    tablesType2 = (tablesType2) ? 'coffee table' : '';
    if(!tablesType1 && !tablesType2) {
      tablesType1 = 'table-book';
      tablesType2 = 'coffee table';
    }

    let tablesShape1 = this.filterTablesForm.get('tablesShapeInfo.tablesShape1').value;
    let tablesShape2 = this.filterTablesForm.get('tablesShapeInfo.tablesShape2').value;
    tablesShape1 = (tablesShape1) ? 'square' : '';
    tablesShape2 = (tablesShape2) ? 'round' : '';
    if(!tablesShape1 && !tablesShape2) {
      tablesShape1 = 'square';
      tablesShape2 = 'round';
    }

    let minTablesWidth = this.filterTablesForm.get('tablesWidthInfo.minTablesWidth').value;
    let maxTablesWidth = this.filterTablesForm.get('tablesWidthInfo.maxTablesWidth').value;
    minTablesWidth = minTablesWidth || 0;
    maxTablesWidth = maxTablesWidth || 99999;

    let minTablesHeight = this.filterTablesForm.get('tablesHeightInfo.minTablesHeight').value;
    let maxTablesHeight = this.filterTablesForm.get('tablesHeightInfo.maxTablesHeight').value;
    minTablesHeight = minTablesHeight || 0;
    maxTablesHeight = maxTablesHeight || 99999;

    let minTablesPrice = this.filterTablesForm.get('tablesPriceInfo.minTablesPrice').value;
    let maxTablesPrice = this.filterTablesForm.get('tablesPriceInfo.maxTablesPrice').value;
    minTablesPrice = minTablesPrice || 0;
    maxTablesPrice = maxTablesPrice || 99999;

    console.log(tablesType1,tablesType2);
    console.log(this.products);

    let filteredProducts = this.products.filter(item => item.info.info.find(i => {
      if(i.name === 'Type' && (i.value === tablesType1 || i.value === tablesType2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Shape' && (i.value === tablesShape1 || i.value === tablesShape2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Width' && (i.value >= minTablesWidth && i.value <= maxTablesWidth)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Height' && (i.value >= minTablesHeight && i.value <= maxTablesHeight)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Price' && (i.value >= minTablesPrice && i.value <= maxTablesPrice)) {
        return i;
      }
    }));
    console.log(filteredProducts);
    this.setPage(1, filteredProducts);
    this.filteredProducts = JSON.parse(JSON.stringify(filteredProducts));
    this.filteredProductsChange.emit(this.filteredProducts);

    console.log(this.products, filteredProducts);
    this.filterTablesForm.reset();
    this.show = 'products-filter';
    this.showChange.emit(this.show);
    this.close = !this.close;
    this.closeChange.emit(this.close);
    console.log(this.show);
  }

  ngOnInit(): void {
    this.initFilterTablesForm();
  }

}
