import {Injectable} from '@angular/core';

export class Pagination {
  public totalItems: number;
  public currentPage: number;
  public pageSize: number;
  public totalPages: number;
  public startPage: number;
  public endPage: number;
  public startIndex: number;
  public endIndex: number;
  public pages: Array<number>;

  constructor(totalItems: number, currentPage: number, pageSize: number, totalPages: number,
              startPage: number, endPage: number, startIndex: number, endIndex: number, pages: Array<number>) {
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.startPage = startPage;
    this.endPage = endPage;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.pages = pages;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  // totalItems - всего товаров (в коллекции)
  // currentPage - текущая страница
  // pageSize - количество товаров на странице
  // totalPages - количество страниц
  // startPage - начальная страница
  // endPage - последняя страница
  // startIndex - индекс первого товара на текущей странице
  // endIndex - индекс последнего товара на текущей странице
  // pages - это массив страниц для переключения
  // Math.ceil() - округляет вверх до ближайшего большего целого

  public totalPages: number;
  public startPage: number;
  public endPage: number;
  public startIndex: number;
  public endIndex: number;
  public pages: Array<number>;

  constructor() {
  }

  getPager = (totalItems: number, currentPage: number = 1, pageSize: number = 6): Pagination => {
    // считаем, сколько будет страниц всего (общее кол-во продуктов делим на кол-во продуктов на странице)
    this.totalPages = Math.ceil(totalItems / pageSize);

    // убедимся, что текущая страница не выходит за пределы диапазона допустимого
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > this.totalPages) {
      currentPage = this.totalPages;
    }

    // здесь высчитываем, как будут показываться начальная и конечная страницы
    if (this.totalPages <= 10) {
      // если страниц меньше 10, то показываем все сразу
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // если страниц получается больше 10, томы высчитываем начальную и последнюю показываемые страницы
      if (currentPage <= 6) {
        this.startPage = 1;
        this.endPage = 10;
      } else if (currentPage + 4 >= this.totalPages) {
        this.startPage = this.totalPages - 9;
        this.endPage = this.totalPages;
      } else {
        this.startPage = currentPage - 5;
        this.endPage = currentPage + 4;
      }
    }

    // вычисляем индек первого и индекс последнего товара на текущей странице
    this.startIndex = (currentPage - 1) * pageSize;
    this.endIndex = Math.min(this.startIndex + pageSize - 1, totalItems - 1);

    // создаем массив страниц, по которым мы будем переключаться
    this.pages = Array.from(Array((this.endPage + 1) - this.startPage).keys()).map(i => this.startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: this.totalPages,
      startPage: this.startPage,
      endPage: this.endPage,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      pages: this.pages
    };
  };

}
