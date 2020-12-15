import {Component, OnDestroy, OnInit} from '@angular/core';

import {PaginationService, Pagination} from '../shared/pagination.service';
import {CommonService} from '../shared/common.service';
import {Sofa, Chair, Table} from '../../model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {FilterService} from '../shared/filter.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {

  public filterForm: {} = {
    /*minPrice: ;
    maxPrice: ;*/
    typeStraight: '',
    typeCorner: '',
   /* mechanism: ;
    minBedWidth: ;
    maxBedWidth: ;
    minBedLength: ;
    maxBedLength: ;*/
  };

  /*public sofas: Sofa[];
  public chairs: Chair[];
  public tables: Table[];*/
  public sub: Subscription;
  public subscriptions: Subscription[] = [];
  public products: any;
  public path: string;

  // это объект, который нам возвращает метод getPager из paginationService
  public pager: Pagination;
  // массив товаров с текущей страницы
  public pagedItems: any[];
 /* public pagedSofas: Sofa[];
  public pagedChairs: Chair[];
  public pagedTables: Table[];*/

  public straight: boolean;
  public corner: boolean;
  public euroBook: boolean;
  public rollOut: boolean;
  public minLength: number;
  public maxLength: number;
  public minBedLength: number;
  public maxBedLength: number;
  public minBedWidth: number;
  public maxBedWidth: number;
  public minPrice: number;
  public maxPrice: number;
  public filteredSofas: Sofa[];

  constructor(private commonService: CommonService,
              private paginationService: PaginationService,
              private filterService: FilterService,
              private activatedRoute: ActivatedRoute) { }

  // в этот метод в качестве параметров передаем номер страницы текущей и массив продуктов
  // (столы, либо диваны, либо стулья)
  setPage = (page: number, products: any[]) => {
    // возвращает объект pager Из paginationService
    this.pager = this.paginationService.getPager(products.length, page);
    // массив продуктов на текущей странице пагинации
    this.pagedItems = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    /*if (this.path === 'sofas') {
      this.pagedSofas = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } else if (this.path === 'chairs') {
      this.pagedChairs = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } else {
      this.pagedTables = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }*/
  }

  // для фильтрации по цене
filterSofasByPrice = (res: Sofa[]) => {
  return (this.minPrice && this.maxPrice) ? res.filter( (item: Sofa) => (item.info.price >= this.minPrice)
           && (item.info.price <= this.maxPrice)) :
         (this.minPrice) ? res.filter( (item: Sofa) => item.info.price >= this.minPrice) :
         (this.maxPrice) ? res.filter( (item: Sofa) => item.info.price <= this.maxPrice) : res;
}
// для фильтрации по длине
filterSofasByLength = (res: Sofa[]) => {
 return (this.minLength && this.maxLength) ? res.filter( (item: Sofa) => (item.info.length >= this.minLength)
    && (item.info.length <= this.maxLength)) :
        (this.minLength) ? res.filter( (item: Sofa) => item.info.length >= this.minLength) :
        (this.maxLength) ? res.filter( (item: Sofa) => item.info.length <= this.maxLength) : res;
}


  check = () => {
    // @ts-ignore
    let conditionType = '';
    let conditionMechanism = '';
    switch (this.path) {
      case 'sofas':
        // tslint:disable-next-line:no-unused-expression
        // если чекнут только один пункт в типе или механизме, а в другом чекнуты либо оба либо ни одного
        if ( ((this.straight && this.corner) && ((this.rollOut || this.euroBook) && (this.rollOut !== this.euroBook)) ) ||
             ((!this.straight && !this.corner) && ((this.rollOut || this.euroBook) && (this.rollOut !== this.euroBook)) ) ||
             (((this.straight || this.corner) && (this.straight !== this.corner)) && (this.rollOut && this.euroBook)) ||
             (((this.straight || this.corner) && (this.straight !== this.corner)) && (!this.rollOut && !this.euroBook))) {

          if (!(this.straight && this.corner) && (this.straight !== this.corner)) {
            conditionType = (this.straight) ? 'прямой' : 'угловой';
          } else {
            conditionMechanism = (this.euroBook) ? 'еврокнижка' : 'выкатной';
          }
          (conditionType) ? this.filterService.getSofasByType(conditionType).subscribe(res => {
            this.filteredSofas = this.filterSofasByPrice(res);
            this.products = this.filterSofasByLength(this.filteredSofas);
            this.setPage(1, this.products);
          }) : this.filterService.getSofasByMechanism(conditionMechanism).subscribe(res => {
             // теперь фильтруем по цене и длине
           this.filteredSofas = this.filterSofasByPrice(res);
           this.products = this.filterSofasByLength(this.filteredSofas);
           this.setPage(1, this.products);
          }); // дальше вариант, если чекнуто по одному пункту и в механизме и в типе
        } else if ( ((this.straight || this.corner) && ((this.straight !== this.corner))) &&
                    ((this.rollOut || this.euroBook) && (this.rollOut !== this.euroBook))) {
          conditionType = (this.straight) ? 'прямой' : 'угловой';
          conditionMechanism = (this.euroBook) ? 'еврокнижка' : 'выкатной';
          this.filterService.getSofasByTypeAndMechanism(conditionType, conditionMechanism).subscribe(res => {
            this.filteredSofas = this.filterSofasByPrice(res);
            this.products = this.filterSofasByLength(this.filteredSofas);
            this.setPage(1, this.products);
          }); // а это если в механизме и в типе чекнуты все, либо ни одного
        } else {
          this.filterService.getAllSofas().subscribe(res => {
            this.filteredSofas = this.filterSofasByPrice(res);
            this.products = this.filterSofasByLength(this.filteredSofas);
            this.setPage(1, this.products);
          });
        }
        break;
      /* case 'tables':

         break;
       case 'chairs':

         break;*/
      default:
        alert('Чет не то');
    }

    /*console.log(this.products);*/

  }

  onSubmit(): void {}

  ngOnInit(): void {
   // это переменная указывает, на какую страницу перешли (диванов, столов или стульев), выцепили из урла
    this.path = this.activatedRoute.snapshot.routeConfig?.path;

    this.subscriptions.push(this.commonService.getAllProducts(this.path).subscribe( (result: any[]) => {

    /*    switch (this.path) {
          case 'sofas':
           this.sofas = result;
           this.setPage(1, this.sofas);
           break;
          case 'tables':
            this.tables = result;
            this.setPage(1, this.tables);
            break;
          case 'chairs':
            this.chairs = result;
            this.setPage(1, this.chairs);
            break;
          default:
            alert('Чет не то');
        }*/

        this.products = result;
        this.setPage(1, this.products);
        console.log(this.products);
      }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
