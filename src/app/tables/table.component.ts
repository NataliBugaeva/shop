import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../shared/common.service';

import {Pagination, PaginationService} from '../shared/pagination.service';
import {ActivatedRoute} from '@angular/router';
import {Table} from '../../model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  public tables: Table[];
  public subscriptions: Subscription[] = [];

  // это объект, который нам возвращает метод getPager из paginationService
  public pager: Pagination;
  // массив товаров с текущей страницы
  public pagedItems: Table[];

  constructor(private service: CommonService, private activatedRoute: ActivatedRoute,
              private paginationService: PaginationService) { }

  setPage = (page: number) => {
    // возвращаем нужный нам объект pager Из сервиса paginationService
    this.pager = this.paginationService.getPager(this.tables.length, page);

    // получаем массив столов на конкретной странице
    this.pagedItems = this.tables.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getAllTables().subscribe( (result: Table[]) => {
        this.tables = result;
        this.setPage(1);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
