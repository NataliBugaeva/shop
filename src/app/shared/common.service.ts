import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {Inject} from '@angular/core';
import {FirebaseApp} from '@angular/fire';
import {take, filter, map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Chair, Sofa, Table} from '../../model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  form: any;
  allSofas: any;

  constructor(public fireStore: AngularFirestore,
              public fireDb: AngularFireDatabase, @Inject(FirebaseApp) public firebaseApp: any
              ) {}

  manySofas: {}[] = [
    {type: 'угловой', name: 'Мэдиссон', length: 250, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9C%D1%8D%D0%B4%D0%B8%D1%81%D1%81%D0%BE%D0%BD.jpeg?alt=media&token=1a2ed397-4cce-435b-aa02-db0af85dbfec', comments: [], mechanism: 'еврокнижка', bedLength: 200, bedWidth: 160, material: 'ткань', price: 1500, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9C%D1%8D%D0%B4%D0%B8%D1%81%D1%81%D0%BE%D0%BD_small.jpeg?alt=media&token=121a8ef0-82c7-4526-8092-3b4ecef48a33'},
    {type: 'угловой', name: 'Челси', length: 219, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A7%D0%B5%D0%BB%D1%81%D0%B8.jpeg?alt=media&token=9b93f991-042a-4fbe-8f8d-61a65743f10e', comments: [], mechanism: 'выкатной', bedLength: 195, bedWidth: 124, material: 'ткань', price: 1230, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A7%D0%B5%D0%BB%D1%81%D0%B8_small.jpeg?alt=media&token=62c51d6b-3c62-45b0-be46-c280fb2a90ae'},
    {type: 'прямой', name: 'Атлантика', length: 230, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%90%D1%82%D0%BB%D0%B0%D0%BD%D1%82%D0%B8%D0%BA%D0%B0.jpeg?alt=media&token=7a71249a-995b-4cc8-831e-aa93ebd55042', comments: [], mechanism: 'еврокнижка', bedLength: 200, bedWidth: 140, material: 'ткань', price: 1120, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%90%D1%82%D0%BB%D0%B0%D0%BD%D1%82%D0%B8%D0%BA%D0%B0_small.jpeg?alt=media&token=5ee349b6-601d-49f8-ba44-1df3c96d218a'},
    {type: 'прямой', name: 'Берген', length: 222, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%91%D0%B5%D1%80%D0%B3%D0%B5%D0%BD.jpeg?alt=media&token=ce2b87aa-cead-4076-bf2e-8a22661744c3', comments: [], mechanism: 'еврокнижка', bedLength: 190, bedWidth: 115, material: 'ткань', price: 1340, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%91%D0%B5%D1%80%D0%B3%D0%B5%D0%BD_small.jpeg?alt=media&token=70080c57-2abb-4bb7-a582-db8bc25bf000'},
    {type: 'прямой', name: 'Динс', length: 215, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%94%D0%B8%D0%BD%D1%81.jpeg?alt=media&token=47b91987-3ee4-47db-8112-18195e007798', comments: [], mechanism: 'еврокнижка', bedLength: 200, bedWidth: 125, material: 'ткань', price: 1270, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%94%D0%B8%D0%BD%D1%81_small.jpeg?alt=media&token=efe4c146-443d-4ec3-8b98-089e64df6a38'},
    {type: 'прямой', name: 'Орхидея', length: 240, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9E%D1%80%D1%85%D0%B8%D0%B4%D0%B5%D1%8F.jpeg?alt=media&token=4fea081a-f9a8-4a5a-a9e5-77cf1783f1db', comments: [], mechanism: 'выкатной', bedLength: 210, bedWidth: 150, material: 'ткань', price: 1590, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%9E%D1%80%D1%85%D0%B8%D0%B4%D0%B5%D1%8F_small.jpeg?alt=media&token=19f95df0-1899-4854-b631-2e42929b7d00'},
    {type: 'прямой', name: 'Ровуд', length: 225, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A0%D0%BE%D0%B2%D1%83%D0%B4.jpeg?alt=media&token=33bdf8e2-1547-4641-b94f-abfb881f2bc7', comments: [], mechanism: 'еврокнижка', bedLength: 193, bedWidth: 120, material: 'ткань', price: 1380, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/sofas%2F%D0%A0%D0%BE%D0%B2%D1%83%D0%B4_small.jpeg?alt=media&token=98b2d96f-ed69-4ff5-b58d-b79d4f47414d'},
  ];

  manyChairs: {}[] = [
    {type: 'кресло-кровать', name: 'Санат', width: 103, height: 90, depth: 82, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D0%B0%D0%BD%D1%82%D0%B0_large.jpg?alt=media&token=c4d33be2-795c-4c5d-8083-4c4c59d81fab', comments: [], mechanism: 'выкатной', bedLength: 190, bedWidth: 70, material: 'ткань', price: 649, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D0%B0%D0%BD%D1%82%D0%B0_small.jpg?alt=media&token=dcbea77b-e3fc-479a-a40f-589a09c3a23d'},
    {type: 'кресло-кровать', name: 'Найс', width: 111, height: 84, depth: 80, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9D%D0%B0%D0%B9%D1%81_large.jpg?alt=media&token=b3375c68-6996-4b5e-8498-95a7fc45cc9e', comments: [], mechanism: 'выкатной', bedLength: 195, bedWidth: 85, material: 'ткань', price: 562, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9D%D0%B0%D0%B9%D1%81_small.jpg?alt=media&token=83b2ec67-324b-4e80-bfc3-fa1d958681a3'},
    {type: 'кресло-кровать', name: 'Ваттвикен', width: 92, height: 86, depth: 83, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B0%D1%82%D1%82%D0%B2%D0%B8%D0%BA%D0%B5%D0%BD_large.jpg?alt=media&token=d6686de1-adc3-4e1f-b311-a449e8ab63d0', comments: [], mechanism: 'выкатной', bedLength: 200, bedWidth: 70, material: 'ткань', price: 602, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B0%D1%82%D1%82%D0%B2%D0%B8%D0%BA%D0%B5%D0%BD_small.jpg?alt=media&token=1c60a63b-fe01-41e7-a861-588a22e6337d'},
    {type: 'интерьерное', name: 'Йорк', width: 86, height: 95, depth: 85, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%99%D0%BE%D1%80%D0%BA_large.jpg?alt=media&token=2e8944f4-678c-40d9-865f-42941b9ff825', comments: [], mechanism: '-', bedLength: 0, bedWidth: 0, material: 'ткань', price: 330, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%99%D0%BE%D1%80%D0%BA_small.jpg?alt=media&token=04e54fb4-7d7d-450e-aa2a-e892a3c738ca'},
    {type: 'интерьерное', name: 'Страндмон', width: 82, height: 101, depth: 96, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B4%D0%BC%D0%BE%D0%BD_large.jpg?alt=media&token=35ad7219-75cd-49c9-b8ff-fbcc442060a0', comments: [], mechanism: '-', bedLength: 0, bedWidth: 0, material: 'ткань', price: 530, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B4%D0%BC%D0%BE%D0%BD_small.jpg?alt=media&token=dc16b185-9109-4af7-a145-cc80db91f48a'},
    {type: 'интерьерное', name: 'Витио', width: 87, height: 90, depth: 52, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B8%D1%82%D0%B8%D0%BE_large.jpg?alt=media&token=0d61cc4e-0507-49f5-b9a5-683921798a62', comments: [], mechanism: '-', bedLength: 0, bedWidth: 0, material: 'ткань', price: 658, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%92%D0%B8%D1%82%D0%B8%D0%BE_small.jpg?alt=media&token=0dbd5863-e3b9-4e9f-9b93-114c62c9c78d'},
    {type: 'интерьерное', name: 'Рио', width: 96, height: 98, depth: 89, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A0%D0%B8%D0%BE_Large.jpg?alt=media&token=ab425b57-2b5f-4a25-a699-905f3144e40c', comments: [], mechanism: '-', bedLength: 0, bedWidth: 0, material: 'ткань', price: 520, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%A0%D0%B8%D0%BE_small.jpg?alt=media&token=574ca445-e441-453f-b634-7b04134b9a0c'},
    {type: 'интерьерное', name: 'Лидс', width: 83, height: 92, depth: 83, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9B%D0%B8%D0%B4%D1%81_large.jpg?alt=media&token=4ff8f620-a726-467e-aa53-cfd86f7e6322', comments: [], mechanism: '-', bedLength: 0, bedWidth: 0, material: 'ткань', price: 445, imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/chairs%2F%D0%9B%D0%B8%D0%B4%D1%81_small.jpg?alt=media&token=bf109f8e-6c7f-4c4d-997d-f2a0795291cd'}
  ];

  manyTables: {}[] = [
    {type: 'стол-книга', name: 'Сокол СП-09', shape: 'прямоугольная', tabletopMaterial: 'ЛДСП',
      supportMaterial: 'ЛДСП', length: 382, fullLength: 1760, width: 800, height: 740,
      comments: [], price: 251,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_09_large.jpg?alt=media&token=7e53265d-0581-423d-bdd7-67e1b5c27033',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_09_small.jpg?alt=media&token=b905a1a6-d2ae-4bcd-9721-00768006947a' },
    {type: 'стол-книга', name: 'Норден', shape: 'прямоугольная', tabletopMaterial: 'дерево', supportMaterial: 'дерево',
      length: 260, fullLength: 1480, width: 800, height: 740, comments: [], price: 490,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%9D%D0%BE%D1%80%D0%B4%D0%B5%D0%BD_large.jpg?alt=media&token=6a7cee5d-da9b-4014-9f95-60af0e83df0b',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%9D%D0%BE%D1%80%D0%B4%D0%B5%D0%BD_small.jpg?alt=media&token=191f7d9e-5692-4f03-a5ad-67909a7f3745' },
    {type: 'стол-книга', name: 'Сокол СП-18', shape: 'прямоугольная', tabletopMaterial: 'ЛДСП', supportMaterial: 'ЛДСП', length: 90,
      fullLength: 1512, width: 830, height: 775, comments: [], price: 180,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_18_large.jpg?alt=media&token=dbcf1d43-8728-48db-b610-c503962fbb2f',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_18_small.jpg?alt=media&token=9fc3335a-4cbb-4b5b-9d60-ccfed007ddfd' },
    {type: 'стол-книга', name: 'Сокол СП-11', shape: 'прямоугольная', tabletopMaterial: 'ЛДСП', supportMaterial: 'ЛДСП', length: 314,
      fullLength: 2255, width: 830, height: 740, comments: [], price: 360,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_11_large.jpg?alt=media&token=821cf1b3-a187-4a79-8aaf-0fd1c7f54bc4',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%BE%D0%BA%D0%BE%D0%BB_11_small.jpg?alt=media&token=055e43ad-f426-4243-9c5a-3ff867129437' },
    {type: 'журнальный столик', name: 'Аура', shape: 'круглая', tabletopMaterial: 'МДФ', supportMaterial: 'сталь', length: 380,
      fullLength: 380, width: 380, height: 450, comments: [], price: 131,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%90%D1%83%D1%80%D0%B0_large.jpg?alt=media&token=570797f8-1e86-4bf7-baf4-17acfe16a319',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%90%D1%83%D1%80%D0%B0_small.jpg?alt=media&token=3e10f6f4-ce79-4af2-aaa0-be2cb7b12965' },
    {type: 'журнальный столик', name: 'Синтра', shape: 'круглая', tabletopMaterial: 'МДФ', supportMaterial: 'сталь', length: 350,
      fullLength: 350, width: 350, height: 350, comments: [], price: 144,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%B8%D0%BD%D1%82%D1%80%D0%B0_large.jpg?alt=media&token=9346a3d0-0753-49ef-a750-64af5f7dd160',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A1%D0%B8%D0%BD%D1%82%D1%80%D0%B0_small.jpg?alt=media&token=fe773540-d84e-4796-b447-ea3ff9725bf4' },
    {type: 'журнальный столик', name: 'Вега', shape: 'круглая', tabletopMaterial: 'стекло', supportMaterial: 'дерево', length: 450,
      fullLength: 450, width: 450, height: 550, comments: [], price: 155,
      imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%92%D0%B5%D0%B3%D0%B0_large.jpg?alt=media&token=fefe8808-1cd7-4a82-b7db-a1ed89e53e18',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%92%D0%B5%D0%B3%D0%B0_small.jpg?alt=media&token=e21b4fb0-a17f-4b33-bb30-e2438dcacd07' },
    {type: 'журнальный столик', name: 'Халмар', shape: 'круглая', tabletopMaterial: 'стекло', supportMaterial: 'сталь', length: 450,
      fullLength: 450, width: 450, height: 600, comments: [], price: 165, imgLarge: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A5%D0%B0%D0%BB%D0%BC%D0%B0%D1%80_large.jpg?alt=media&token=aa8110b4-2311-45f0-b5f3-64829b407b07',
      imgSmall: 'https://firebasestorage.googleapis.com/v0/b/test-a829f.appspot.com/o/tables%2F%D0%A5%D0%B0%D0%BB%D0%BC%D0%B0%D1%80_small.jpg?alt=media&token=bc6ef550-863c-4ce9-8966-d4a2e52699a0' }
  ];

  // добавляем в коллекцию диванов много диванов(документов) c автоматической генерацией id
  addManySofas = () => {
    this.manySofas.forEach( (item) => {this.fireStore.collection('sofas').add(item); });
  }

  // добавляем в коллекцию кресел много кресел(документов) c автоматической генерацией id
  addManyChairs = () => {
    this.manyChairs.forEach( (item) => {this.fireStore.collection('chairs').add(item); });
  }

  // добавляем в коллекцию кресел много столов(документов) c автоматической генерацией id
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
  addNewSofa = () => {
    this.fireStore.collection('sofas').add({type: 'Натахич', name: 'Ровуд', length: 225, imgLarge: 'https://',
                     comments: [], mechanism: 'еврокнижка', bedLength: 193, bedWidth: 120, material: 'ткань',
                     price: 1380, imgSmall: 'https://'});
  }

  // получить конкретный диван по Id
  getSofaId = (id: string): Observable<Sofa> => {
    // @ts-ignore
    return this.fireStore.collection('sofas').doc(id).snapshotChanges()
      .pipe(map( (res) => ({id: res.payload.id, info: res.payload.data()})));
  }

  // получаем все диваны
  getAllSofas = (): Observable<Sofa[]> => {
   // @ts-ignore
    return  this.fireStore.collection('sofas').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // получаем все кресла
  getAllChairs = (): Observable<Chair[]> => {
    // @ts-ignore
    return  this.fireStore.collection('chairs').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // получить конкретное кресло по Id
  getChairId = (id: string): Observable<Chair> => {
    // @ts-ignore
    return this.fireStore.collection('chairs').doc(id).snapshotChanges()
      .pipe(map( (res) => ({id: res.payload.id, info: res.payload.data()})));
  }

  // получаем все столы
  getAllTables = (): Observable<Table[]> => {
    // @ts-ignore
    return  this.fireStore.collection('tables').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }


  // получить конкретный стол по Id
  getTableId = (id: string): Observable<Table> => {
    // @ts-ignore
    return this.fireStore.collection('tables').doc(id).snapshotChanges()
      .pipe(map( (res) => ({id: res.payload.id, info: res.payload.data()})));
  }

  // получаем все продукты
  getAllProducts = (path: string): Observable<{ id: string; info: unknown }[]> => {
    return  this.fireStore.collection(path).snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  // получить продукт по Id
  getProductId = (path: string, id: string): Observable<{id: string, info: {}}> => {
    // @ts-ignore
    return this.fireStore.collection(path).doc(id).snapshotChanges()
      .pipe(map( (res) => ({id: res.payload.id, info: res.payload.data()})));
  }

}
