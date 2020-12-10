import {Component, OnDestroy, OnInit} from '@angular/core';

import {CommonService} from '../shared/common.service';

import {Input} from '@angular/core';

import {ActivatedRoute} from '@angular/router';


import {PaginationService} from '../shared/pagination.service';
import {Pagination} from '../shared/pagination.service';
import {Sofa} from '../../model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-sofa',
  templateUrl: './sofa.component.html',
  styleUrls: ['./sofa.component.css']
})

export class SofaComponent implements OnInit, OnDestroy {

  @Input() name: string;

  public sofas: Sofa[];
  public subscriptions: Subscription[] = [];


  // это объект, который нам возвращает метод getPager из paginationService
 public pager: Pagination;
  // массив товаров с текущей страницы
 public pagedItems: Sofa[];


  constructor(public service: CommonService, private activatedRoute: ActivatedRoute,
              private paginationService: PaginationService) {}

  onSubmit(): void {}

  setPage = (page: number) => {
    // get pager object from service
    this.pager = this.paginationService.getPager(this.sofas.length, page);

    // get current page of items
    this.pagedItems = this.sofas.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getAllSofas().subscribe( (result: Sofa[]) => {
      this.sofas = result;
      this.setPage(1);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
