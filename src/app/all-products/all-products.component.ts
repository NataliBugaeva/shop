import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationService, Pagination} from '../shared/pagination.service';
import {CommonService} from '../shared/common.service';
import {Product} from '../../model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];
  public products: any;
  public path: string;
  public show = 'products-filter';
  public close = true;
  // это объект, который нам возвращает метод getPager из paginationService
  public pager: Pagination;
  // массив товаров с текущей страницы (для пагинации)
  public pagedItems: Product[];
  public filteredProducts: [];

  constructor(private commonService: CommonService,
              private authenticationService: AuthenticationService,
              private paginationService: PaginationService,
              private activatedRoute: ActivatedRoute) {
  }

  setPage(page: number, products: Product[]) {
    this.pager = this.paginationService.getPager(products.length, page);
    this.pagedItems = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  toggle() {
    this.show = this.show === 'products-filter' ? 'show' : 'products-filter';
    this.close = !this.close;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(res => {
        this.path = res.category;
        this.subscriptions.push(
          this.commonService.getAllProducts(this.path).subscribe((result: any[]) => {
            this.products = result;
            this.filteredProducts = this.products;
            this.setPage(1, this.products);
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
