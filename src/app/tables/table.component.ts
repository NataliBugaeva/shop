import { Component, OnInit } from '@angular/core';
import {CommonService} from '../shared/common.service';

import {Pagination, PaginationService} from '../pagination/pagination.service';
import {ActivatedRoute} from '@angular/router';
import {Table} from '../../model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public tables: Table[];

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

    this.service.getAllTables().subscribe( (result: Table[]) => {
      this.tables = result;
      this.setPage(1);
    });

  }

}
