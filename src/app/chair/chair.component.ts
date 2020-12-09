import { Component, OnInit } from '@angular/core';
import {CommonService} from '../shared/common.service';
import {Pagination, PaginationService} from '../pagination/pagination.service';
import {ActivatedRoute} from '@angular/router';
import {Chair} from '../../model';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

  public chairs: Chair[];

  // это объект, который нам возвращает метод getPager из paginationService
  public pager: Pagination;
  // массив товаров с текущей страницы
  public pagedItems: number[];

  constructor(private service: CommonService, private activatedRoute: ActivatedRoute,
              private paginationService: PaginationService) { }

  setPage = (page: number) => {
    // возвращаем нужный нам объект pager Из сервиса paginationService
    this.pager = this.paginationService.getPager(this.chairs.length, page);

    // получаем массив стульев на конкретной странице
    this.pagedItems = this.chairs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnInit(): void {

    this.service.getAllChairs().subscribe( (result: Chair[]) => {
      this.chairs = result;
      this.setPage(1);
    });

  }

}
