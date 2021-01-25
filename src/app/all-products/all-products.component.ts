import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {PaginationService, Pagination} from '../shared/pagination.service';
import {CommonService} from '../shared/common.service';
import {Product} from '../../model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {distinct, filter, groupBy, map} from 'rxjs/operators';
import {FilterService} from '../shared/filter.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];
  public products: any;
  public path: string;

  // это объект, который нам возвращает метод getPager из paginationService
  public pager: Pagination;
  // массив товаров с текущей страницы (для пагинации)
  public pagedItems: Product[];

  public straight: string;
  public corner: string;
  public euroBook: boolean;
  public rollOut: boolean;

  public minLength: string;
  public maxLength: string;
  public minPrice: number;
  public maxPrice: number;

// массивы для выбранных чекбоксов
  public arrTypeChecked: string[];
  public arrMechanismChecked: string[];

  // массивы для значений типов и механизмов, их будем получать из базы при загрузке страницы в ngOnInit
  public arrTypeUnique: string[];
  public arrMechanismUnique: string[];

// Это для объединения результатов запросов для фильтрации
  public result1: [];
  public result2: [];
  public resultItog: [];


  public filteredProducts: [];

  public arr: string[];

  public filterSofasForm: FormGroup;

  constructor(private commonService: CommonService,
              private paginationService: PaginationService,
              private filterService: FilterService,
              private activatedRoute: ActivatedRoute,
              public fb: FormBuilder) { }

  // в этот метод в качестве параметров передаем номер страницы текущей и массив продуктов
  // (столы, либо диваны, либо стулья)
  setPage(page: number, products: Product[]) {
    console.log(this.filteredProducts);
    // возвращает объект pager Из paginationService
    this.pager = this.paginationService.getPager(products.length, page);
    // массив продуктов на текущей странице пагинации
    this.pagedItems = products.slice(this.pager.startIndex, this.pager.endIndex + 1);
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


/*
findEqualObjects = (someArray: [], otherArray: []) => {
    let equalObjects = [];

    someArray.forEach( elementOfSomeArray => {
      otherArray.forEach( elementOfOrherArray => {
        if (JSON.stringify(elementOfSomeArray) === JSON.stringify(elementOfOrherArray)) {
          equalObjects.push(elementOfOrherArray);
        }
      });
    });

    return equalObjects;
  }*/

/*
ch = (): void => {
  this.arrTypeChecked = Array.from( document.querySelectorAll('input[name="type"]:checked') ).map(item => item.value);
  this.arrMechanismChecked = Array.from( document.querySelectorAll('input[name="mechanism"]:checked') ).map(item => item.value);

  if (!this.arrTypeChecked.length && !this.arrMechanismChecked.length) {
    this.arrTypeChecked = this.arrTypeUnique;
    this.arrMechanismChecked = this.arrMechanismUnique;
  } else if (!this.arrTypeChecked.length) {
    this.arrTypeChecked = this.arrTypeUnique;
  } else if (!this.arrMechanismChecked.length) {
    this.arrMechanismChecked = this.arrMechanismUnique;
  } else {
    console.log('good');
  }


  this.filterService.mechanism(this.path, this.arrMechanismChecked, this.minLength, this.maxLength)
    .subscribe( res => {
      this.result1 = res;
      this.filterService.type(this.path, this.arrTypeChecked, this.minPrice * 1, this.maxPrice * 1)
        .subscribe( res => {
          this.result2 = res;
          this.resultItog = this.findEqualObjects(this.result1, this.result2);
          console.log(this.resultItog);
        });
    });

}*/

  filter(): void {
   /* this.subscriptions.push(
      this.commonService.getAllProducts(this.path).subscribe( (result: any[]) => {
        this.products = result;
      })
    );*/

    let type1 = this.filterSofasForm.get('typeInfo.type1').value;
    let type2 = this.filterSofasForm.get('typeInfo.type2').value;
    type1 = (type1) ? 'прямой' : '';
    type2 = (type2) ? 'угловой' : '';
    if(!type1 && !type2) {
      type1 = 'прямой';
      type2 = 'угловой';
    }

    let mechanism1 = this.filterSofasForm.get('mechanismInfo.mechanism1').value;
    let mechanism2 = this.filterSofasForm.get('mechanismInfo.mechanism2').value;
    mechanism1 = (mechanism1) ? 'еврокнижка' : '';
    mechanism2 = (mechanism2) ? 'выкатной' : '';
    if(!mechanism1 && !mechanism2) {
      mechanism1 = 'еврокнижка';
      mechanism2 = 'выкатной';
    }

    let minLength = this.filterSofasForm.get('lengthInfo.minLength').value;
    let maxLength = this.filterSofasForm.get('lengthInfo.maxLength').value;
    minLength = minLength || 0;
    maxLength = maxLength || 99999;

    let minPrice = this.filterSofasForm.get('priceInfo.minPrice').value;
    let maxPrice = this.filterSofasForm.get('priceInfo.maxPrice').value;
    minPrice = minPrice || 0;
    maxPrice = maxPrice || 99999;

    console.log(type1,type2,mechanism1,mechanism2);

    let filteredProducts = this.products.filter(item => item.info.info.find(i => {
      if(i.name === 'Тип' && (i.value === type1 || i.value === type2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Механизм' && (i.value === mechanism1 || i.value === mechanism2)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Цена' && (i.value >= minPrice && i.value <= maxPrice)) {
        return i;
      }
    })).filter(item => item.info.info.find(i => {
      if(i.name === 'Длина' && (i.value >= minLength && i.value <= maxLength)) {
        return i;
      }
    }));
    this.setPage(1, filteredProducts);
    this.filteredProducts = filteredProducts;

    /*this.products = this.products.filter(item => item.info.info.find(i => {
      if((i.name === 'Тип' && (i.value === type1 || i.value === type2)) ||
        (i.name === 'Механизм' && (i.value === mechanism1 || i.value === mechanism2))/!* &&
        (i.name === 'Цена' && (i.value >= minPrice && i.value <= maxPrice)) &&
        (i.name === 'Длина' && (i.value >= minLength && i.value <= maxLength))*!/) {
        return i;
      }
    }))*/

    console.log(this.products, filteredProducts);
  }

  ngOnInit(): void {
    this.initFilterSofasForm();
   // это переменная указывает, на какую страницу перешли (диванов, столов или стульев), выцепили из урла
    /*this.path = this.activatedRoute.snapshot.routeConfig?.path;*/
    /*this.path = this.activatedRoute.snapshot.params.category;*/
    /*this.path = this.activatedRoute.snapshot.paramMap.get('category');
    console.log(this.path);*/


this.subscriptions.push(
  this.activatedRoute.params.subscribe( res => {
    this.path = res.category;
    console.log(this.path);
    this.subscriptions.push(
      this.commonService.getAllProducts(this.path).subscribe( (result: any[]) => {
        this.products = result;
        this.filteredProducts = this.products;
        this.setPage(1, this.products);
        console.log(this.products);
      })
    );
  })
);

/*    // выбрать уникальные значения поля Mechanism (this.arrMechanismUnique)
    this.subscriptions.push(
      this.filterService.getUniqueMechanism().subscribe(res => {
        this.arrMechanismUnique =  Array.from(new Set(res));
      }));

    // выбрать уникальные значения поля Type (this.arrTypeUnique)
    this.subscriptions.push(
      this.filterService.getUniqueType().subscribe(res => {
        this.arrTypeUnique =  Array.from(new Set(res));
      }));*/
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
