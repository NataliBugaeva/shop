import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {Inject} from '@angular/core';
import {FirebaseApp} from '@angular/fire';
import {take, filter, map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Product, User} from '../../model';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  form: any;
  user: User;

  constructor(public fireStore: AngularFirestore,
              public fireDb: AngularFireDatabase, @Inject(FirebaseApp) public firebaseApp: any) {}



  manySofas: {}[] = [
    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'угловой'}, {name: 'Наименование', value: 'Мэдиссон'}, {name: 'Длина', value: 250},
        {name: 'Механизм', value: 'еврокнижка'}, {name: 'Длина спального места', value: 200},
        {name: 'Ширина спального места', value: 160}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1500}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9C%D1%8D%D0%B4%D0%B8%D1%81%D1%81%D0%BE%D0%BD.jpeg?alt=media&token=1a2ed397-4cce-435b-aa02-db0af85dbfec'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9C%D1%8D%D0%B4%D0%B8%D1%81%D1%81%D0%BE%D0%BD_small.jpeg?alt=media&token=121a8ef0-82c7-4526-8092-3b4ecef48a33'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'угловой'}, {name: 'Наименование', value:  'Челси'}, {name: 'Длина', value:  219},
        {name: 'Механизм', value: 'выкатной'}, {name: 'Длина спального места', value: 195},
        {name: 'Ширина спального места', value: 124}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1230}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A7%D0%B5%D0%BB%D1%81%D0%B8.jpeg?alt=media&token=9b93f991-042a-4fbe-8f8d-61a65743f10e'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A7%D0%B5%D0%BB%D1%81%D0%B8_small.jpeg?alt=media&token=62c51d6b-3c62-45b0-be46-c280fb2a90ae'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value:  'прямой'}, {name: 'Наименование', value: 'Атлантика'}, {name: 'Длина', value: 230},
        {name: 'Механизм', value: 'еврокнижка'}, {name: 'Длина спального места', value: 200},
        {name: 'Ширина спального места', value: 140}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1120}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%90%D1%82%D0%BB%D0%B0%D0%BD%D1%82%D0%B8%D0%BA%D0%B0.jpeg?alt=media&token=7a71249a-995b-4cc8-831e-aa93ebd55042'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%90%D1%82%D0%BB%D0%B0%D0%BD%D1%82%D0%B8%D0%BA%D0%B0_small.jpeg?alt=media&token=5ee349b6-601d-49f8-ba44-1df3c96d218a'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'прямой'}, {name: 'Наименование', value: 'Берген'}, {name: 'Длина', value: 222},
        {name: 'Механизм', value: 'еврокнижка'}, {name: 'Длина спального места', value: 190},
        {name: 'Ширина спального места', value: 115}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1340}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%91%D0%B5%D1%80%D0%B3%D0%B5%D0%BD.jpeg?alt=media&token=ce2b87aa-cead-4076-bf2e-8a22661744c3'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%91%D0%B5%D1%80%D0%B3%D0%B5%D0%BD_small.jpeg?alt=media&token=70080c57-2abb-4bb7-a582-db8bc25bf000'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'прямой'}, {name: 'Наименование', value: 'Динс'}, {name: 'Длина', value: 215},
        {name: 'Механизм', value: 'еврокнижка'}, {name: 'Длина спального места', value: 200},
        {name: 'Ширина спального места', value: 125}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1270}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%94%D0%B8%D0%BD%D1%81.jpeg?alt=media&token=47b91987-3ee4-47db-8112-18195e007798'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%94%D0%B8%D0%BD%D1%81_small.jpeg?alt=media&token=efe4c146-443d-4ec3-8b98-089e64df6a38'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'прямой'}, {name: 'Наименование', value: 'Орхидея'}, {name: 'Длина', value: 240},
        {name: 'Механизм', value: 'выкатной'}, {name: 'Длина спального места', value: 210},
        {name: 'Ширина спального места', value: 150}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1590}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9E%D1%80%D1%85%D0%B8%D0%B4%D0%B5%D1%8F.jpeg?alt=media&token=4fea081a-f9a8-4a5a-a9e5-77cf1783f1db'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9E%D1%80%D1%85%D0%B8%D0%B4%D0%B5%D1%8F_small.jpeg?alt=media&token=19f95df0-1899-4854-b631-2e42929b7d00'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'прямой'}, {name: 'Наименование', value: 'Ровуд'}, {name: 'Длина', value: 225},
        {name: 'Механизм', value: 'еврокнижка'}, {name: 'Длина спального места', value: 193},
        {name: 'Ширина спального места', value: 120}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1380}
        ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A0%D0%BE%D0%B2%D1%83%D0%B4.jpeg?alt=media&token=33bdf8e2-1547-4641-b94f-abfb881f2bc7'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A0%D0%BE%D0%B2%D1%83%D0%B4_small.jpeg?alt=media&token=98b2d96f-ed69-4ff5-b58d-b79d4f47414d'}
      ],
      comments: []
    },
  ];


  manyChairs: {}[] = [
    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'кресло-кровать'}, {name: 'Наименование', value: 'Санат'}, {name: 'Ширина', value: 103},
        {name: 'Высота', value: 90}, {name: 'Глубина', value: 82}, {name: 'Механизм', value: 'выкатной'},
        {name: 'Длина спального места', value: 190}, {name: 'Ширина спального места', value: 70},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 649}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D0%B0%D0%BD%D1%82%D0%B0_large.jpg?alt=media&token=c4d33be2-795c-4c5d-8083-4c4c59d81fab'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D0%B0%D0%BD%D1%82%D0%B0_small.jpg?alt=media&token=dcbea77b-e3fc-479a-a40f-589a09c3a23d'}
        ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'кресло-кровать'}, {name: 'Наименование', value: 'Найс'}, {name: 'Ширина', value: 111},
        {name: 'Высота', value: 84}, {name: 'Глубина', value: 80}, {name: 'Механизм', value: 'выкатной'},
        {name: 'Длина спального места', value: 195}, {name: 'Ширина спального места', value: 85},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 562}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9D%D0%B0%D0%B9%D1%81_large.jpg?alt=media&token=b3375c68-6996-4b5e-8498-95a7fc45cc9e'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9D%D0%B0%D0%B9%D1%81_small.jpg?alt=media&token=83b2ec67-324b-4e80-bfc3-fa1d958681a3'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'кресло-кровать'}, {name: 'Наименование', value: 'Ваттвикен'}, {name: 'Ширина', value: 92},
        {name: 'Высота', value: 86}, {name: 'Глубина', value: 83}, {name: 'Механизм', value: 'выкатной'},
        {name: 'Длина спального места', value: 200}, {name: 'Ширина спального места', value: 70},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 602}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B0%D1%82%D1%82%D0%B2%D0%B8%D0%BA%D0%B5%D0%BD_large.jpg?alt=media&token=d6686de1-adc3-4e1f-b311-a449e8ab63d0'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B0%D1%82%D1%82%D0%B2%D0%B8%D0%BA%D0%B5%D0%BD_small.jpg?alt=media&token=1c60a63b-fe01-41e7-a861-588a22e6337d'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'интерьерное'}, {name: 'Наименование', value: 'Йорк'}, {name: 'Ширина', value: 86},
        {name: 'Высота', value: 95}, {name: 'Глубина', value: 85}, {name: 'Механизм', value: '-'},
        {name: 'Длина спального места', value: 0}, {name: 'Ширина спального места', value: 0},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 330}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%99%D0%BE%D1%80%D0%BA_large.jpg?alt=media&token=2e8944f4-678c-40d9-865f-42941b9ff825'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%99%D0%BE%D1%80%D0%BA_small.jpg?alt=media&token=04e54fb4-7d7d-450e-aa2a-e892a3c738ca'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'интерьерное'}, {name: 'Наименование', value: 'Страндмон'}, {name: 'Ширина', value: 82},
        {name: 'Высота', value: 101}, {name: 'Глубина', value: 96}, {name: 'Механизм', value: '-'},
        {name: 'Длина спального места', value: 0}, {name: 'Ширина спального места', value: 0},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 530}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B4%D0%BC%D0%BE%D0%BD_large.jpg?alt=media&token=35ad7219-75cd-49c9-b8ff-fbcc442060a0'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B4%D0%BC%D0%BE%D0%BD_small.jpg?alt=media&token=dc16b185-9109-4af7-a145-cc80db91f48a'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'интерьерное'}, {name: 'Наименование', value: 'Витио'}, {name: 'Ширина', value: 87},
        {name: 'Высота', value: 90}, {name: 'Глубина', value: 52}, {name: 'Механизм', value: '-'},
        {name: 'Длина спального места', value: 0}, {name: 'Ширина спального места', value: 0},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 658}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B8%D1%82%D0%B8%D0%BE_large.jpg?alt=media&token=0d61cc4e-0507-49f5-b9a5-683921798a62'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B8%D1%82%D0%B8%D0%BE_small.jpg?alt=media&token=0dbd5863-e3b9-4e9f-9b93-114c62c9c78d'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'интерьерное'}, {name: 'Наименование', value: 'Рио'}, {name: 'Ширина', value: 96},
        {name: 'Высота', value: 98}, {name: 'Глубина', value: 89}, {name: 'Механизм', value: '-'},
        {name: 'Длина спального места', value: 0}, {name: 'Ширина спального места', value: 0},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 520}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A0%D0%B8%D0%BE_Large.jpg?alt=media&token=ab425b57-2b5f-4a25-a699-905f3144e40c'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A0%D0%B8%D0%BE_small.jpg?alt=media&token=574ca445-e441-453f-b634-7b04134b9a0c'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'интерьерное'}, {name: 'Наименование', value: 'Лидс'}, {name: 'Ширина', value: 83},
        {name: 'Высота', value: 92}, {name: 'Глубина', value: 83}, {name: 'Механизм', value: '-'},
        {name: 'Длина спального места', value: 0}, {name: 'Ширина спального места', value: 0},
        {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 445}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9B%D0%B8%D0%B4%D1%81_large.jpg?alt=media&token=4ff8f620-a726-467e-aa53-cfd86f7e6322'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9B%D0%B8%D0%B4%D1%81_small.jpg?alt=media&token=bf109f8e-6c7f-4c4d-997d-f2a0795291cd'}
      ],
      comments: []
    }
];

  manyTables: {}[] = [
    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'стол-книга'}, {name: 'Наименование', value: 'Сокол СП-09'},
        {name: 'Форма', value: 'прямоугольная'}, {name: 'Материал столешницы', value: 'ЛДСП'},
        {name: 'Материал опоры', value: 'ЛДСП'},
        {name: 'Длина', value: 38}, {name: 'Длина в разложенном виде', value: 176}, {name: 'Ширина', value: 80},
        {name: 'Высота', value: 74}, {name: 'Цена', value: 251}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_09_large.jpg?alt=media&token=7e53265d-0581-423d-bdd7-67e1b5c27033'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_09_small.jpg?alt=media&token=b905a1a6-d2ae-4bcd-9721-00768006947a'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'стол-книга'}, {name: 'Наименование', value: 'Норден'},
        {name: 'Форма', value: 'прямоугольная'}, {name: 'Материал столешницы', value: 'дерево'},
        {name: 'Материал опоры', value: 'дерево'},
        {name: 'Длина', value: 26}, {name: 'Длина в разложенном виде', value: 148}, {name: 'Ширина', value: 80},
        {name: 'Высота', value: 74}, {name: 'Цена', value: 490}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%9D%D0%BE%D1%80%D0%B4%D0%B5%D0%BD_large.jpg?alt=media&token=6a7cee5d-da9b-4014-9f95-60af0e83df0b'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%9D%D0%BE%D1%80%D0%B4%D0%B5%D0%BD_small.jpg?alt=media&token=191f7d9e-5692-4f03-a5ad-67909a7f3745'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'стол-книга'}, {name: 'Наименование', value: 'Сокол СП-18'},
        {name: 'Форма', value: 'прямоугольная'}, {name: 'Материал столешницы', value: 'ЛДСП'},
        {name: 'Материал опоры', value: 'ЛДСП'},
        {name: 'Длина', value: 90}, {name: 'Длина в разложенном виде', value: 152}, {name: 'Ширина', value: 83},
        {name: 'Высота', value: 77}, {name: 'Цена', value: 180}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_18_large.jpg?alt=media&token=dbcf1d43-8728-48db-b610-c503962fbb2f'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_18_small.jpg?alt=media&token=9fc3335a-4cbb-4b5b-9d60-ccfed007ddfd'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'стол-книга'}, {name: 'Наименование', value: 'Сокол СП-11'},
        {name: 'Форма', value: 'прямоугольная'}, {name: 'Материал столешницы', value: 'ЛДСП'},
        {name: 'Материал опоры', value: 'ЛДСП'},
        {name: 'Длина', value: 31}, {name: 'Длина в разложенном виде', value: 225}, {name: 'Ширина', value: 83},
        {name: 'Высота', value: 74}, {name: 'Цена', value: 360}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_11_large.jpg?alt=media&token=821cf1b3-a187-4a79-8aaf-0fd1c7f54bc4'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_11_small.jpg?alt=media&token=055e43ad-f426-4243-9c5a-3ff867129437'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'журнальный столик'}, {name: 'Наименование', value: 'Аура'},
        {name: 'Форма', value: 'круглая'}, {name: 'Материал столешницы', value: 'МДФ'},
        {name: 'Материал опоры', value: 'сталь'},
        {name: 'Длина', value: 38}, {name: 'Длина в разложенном виде', value: 38}, {name: 'Ширина', value: 38},
        {name: 'Высота', value: 45}, {name: 'Цена', value: 131}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%90%D1%83%D1%80%D0%B0_large.jpg?alt=media&token=570797f8-1e86-4bf7-baf4-17acfe16a319'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%90%D1%83%D1%80%D0%B0_small.jpg?alt=media&token=3e10f6f4-ce79-4af2-aaa0-be2cb7b12965'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'журнальный столик'}, {name: 'Наименование', value: 'Синтра'},
        {name: 'Форма', value: 'круглая'}, {name: 'Материал столешницы', value: 'МДФ'},
        {name: 'Материал опоры', value: 'сталь'},
        {name: 'Длина', value: 35}, {name: 'Длина в разложенном виде', value: 35}, {name: 'Ширина', value: 35},
        {name: 'Высота', value: 35}, {name: 'Цена', value: 144}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%B8%D0%BD%D1%82%D1%80%D0%B0_large.jpg?alt=media&token=9346a3d0-0753-49ef-a750-64af5f7dd160'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%B8%D0%BD%D1%82%D1%80%D0%B0_small.jpg?alt=media&token=fe773540-d84e-4796-b447-ea3ff9725bf4'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'журнальный столик'}, {name: 'Наименование', value: 'Вега'},
        {name: 'Форма', value: 'круглая'}, {name: 'Материал столешницы', value: 'стекло'},
        {name: 'Материал опоры', value: 'дерево'},
        {name: 'Длина', value: 45}, {name: 'Длина в разложенном виде', value: 45}, {name: 'Ширина', value: 45},
        {name: 'Высота', value: 55}, {name: 'Цена', value: 155}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%92%D0%B5%D0%B3%D0%B0_large.jpg?alt=media&token=fefe8808-1cd7-4a82-b7db-a1ed89e53e18'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%92%D0%B5%D0%B3%D0%B0_small.jpg?alt=media&token=e21b4fb0-a17f-4b33-bb30-e2438dcacd07'}
      ],
      comments: []
    },

    { id: 'id' + Math.random().toString().slice(3, 10),
      info: [
        {name: 'Тип', value: 'журнальный столик'}, {name: 'Наименование', value: 'Халмар'},
        {name: 'Форма', value: 'круглая'}, {name: 'Материал столешницы', value: 'стекло'},
        {name: 'Материал опоры', value: 'сталь'},
        {name: 'Длина', value: 45}, {name: 'Длина в разложенном виде', value: 45}, {name: 'Ширина', value: 45},
        {name: 'Высота', value: 60}, {name: 'Цена', value: 165}
      ],
      images: [
        {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A5%D0%B0%D0%BB%D0%BC%D0%B0%D1%80_large.jpg?alt=media&token=aa8110b4-2311-45f0-b5f3-64829b407b07'},
        {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A5%D0%B0%D0%BB%D0%BC%D0%B0%D1%80_small.jpg?alt=media&token=bc6ef550-863c-4ce9-8966-d4a2e52699a0'}
      ],
      comments: []
    },
  ];

  // добавляем в коллекцию диванов много диванов(документов) c автоматической генерацией id
  addManySofas = () => {
    this.manySofas.forEach( (item) => {this.fireStore.collection('sofas').add(item); });
  }

  // добавляем в коллекцию кресел много кресел(документов) c автоматической генерацией id
  addManyChairs = () => {
    this.manyChairs.forEach( (item) => {this.fireStore.collection('chairs').add(item); });
  }

  // добавляем в коллекцию столов много столов(документов) c автоматической генерацией id
  addManyTables = () => {
    this.manyTables.forEach( (item) => {this.fireStore.collection('tables').add(item); });
  }

  // получаем диваны по заданному свойству
  getSof = () => {
    this.fireStore.collection('sofas', ref => ref.where('name', '==', 'Атлантика'))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // Добавить один диван с автоматической генерацией id
  addNewSofa(): void {
    this.fireStore.collection('sofas').add(
      { id: 'id' + Math.random().toString().slice(3, 10),
        info: [
          {name: 'Тип', value: 'угловой'}, {name: 'Наименование', value:  'Челси'}, {name: 'Длина', value:  219},
          {name: 'Механизм', value: 'выкатной'}, {name: 'Длина спального места', value: 195},
          {name: 'Ширина спального места', value: 124}, {name: 'Материал', value: 'ткань'}, {name: 'Цена', value: 1230}
        ],
        images: [
          {name: 'imgLarge', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A7%D0%B5%D0%BB%D1%81%D0%B8.jpeg?alt=media&token=9b93f991-042a-4fbe-8f8d-61a65743f10e'},
          {name: 'imgSmall', value: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A7%D0%B5%D0%BB%D1%81%D0%B8_small.jpeg?alt=media&token=62c51d6b-3c62-45b0-be46-c280fb2a90ae'}
        ],
        comments: []
      }
    );
  }

  // добавляем в базу в коллекцию users документ с новым зарегистрировавшимся пользователем
  addNewUser(id: string, email: string): void {
    this.fireStore.collection('users').add({
      id: id,
      email: email,
      basket: [],
      orders: []
    });
  }


  getAllUsers(): Observable<{}> {
    return this.fireStore.collection('users').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // получаем юзера , который сейчас вошел на сайт, по его почте
  getUser(email: string): Observable<any> {
   return  this.fireStore.collection('users', ref => ref.where('email', '==', email))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // обновим корзину пользователя в базе
  addToUserBasket(userId: string, arrProducts: any) {
    return this.fireStore.collection('users').doc(userId).update({
      basket: arrProducts
    });
}



/*  // получить массив продуктов из коллекции сравнения по конкретному пути (sofas/tables/chairs)
  getProductsFromComparison(name: string): Observable<any> {
    return this.fireStore.collection('comparison', ref => ref.where('name', '==', name))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // добавить продукт в документ для сравнение
  addProductToComparison(id: string, path: string, products: Product[]): void {
    this.fireStore.collection('comparison').doc(id).set({name: path, value: products});
  }*/



  // получаем все продукты
  getAllProducts = (path: string): Observable<any> => {
    return  this.fireStore.collection(path).snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // получить продукт по Id
  getProductId = (path: string, id: string): Observable<any> => {
    return this.fireStore.collection(path).doc(id).snapshotChanges()
      .pipe(map( (res) => ({id: res.payload.id, info: res.payload.data()})));
  }

}
