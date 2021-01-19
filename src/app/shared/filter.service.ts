import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore, fromDocRef} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilterService {


  constructor(public fireStore: AngularFirestore) { }

/*  getAllSofas(): Observable<Sofa[]> {
    // @ts-ignore
    return  this.fireStore.collection('sofas').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  getSofasByType = (condition: string): Observable<Sofa[]> => {
    return  this.fireStore.collection('sofas').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))
        .filter((arr: Sofa) => (arr.info.type === condition))));
  }

  getSofasByMechanism = (condition: string): Observable<Sofa[]> => {
    return  this.fireStore.collection('sofas').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))
        .filter((arr: Sofa) => (arr.info.mechanism === condition))));
  }

  getSofasByTypeAndMechanism = (type: string, mechanism: string): Observable<Sofa[]> => {
    return  this.fireStore.collection('sofas').snapshotChanges()
      .pipe(map( (res) => res.map( (doc) => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))
        .filter((arr: Sofa) => (arr.info.type === type) && (arr.info.mechanism === mechanism))));
  }

// для дальнейшей выборки массива с уникальными значениямт механизмов
getUniqueMechanism = (): Observable<string[]> => {
 return this.fireStore.collection('sofas').snapshotChanges()
    .pipe(map( res => res.map( doc => doc.payload.doc.data().mechanism)));
}

// для дальнейшей выборки массива с уникальными значениямт типов
  getUniqueType = (): Observable<string[]> => {
    return this.fireStore.collection('sofas').snapshotChanges()
      .pipe(map( res => res.map( doc => doc.payload.doc.data().type)));
  }

  // фильтруем наши продукты по заданным параметрам
  getFilteredProducts = (path: string, types: string[], mechanism: string[],
                         minLength: number = 0, maxLength: number = 10000,
                         minPrice: number = 0, maxPrice: number = 100000): Observable<any> => {
    return this.fireStore.collection(path, ref => ref.where('type', 'in', types)
     /!* .where('mechanism', 'in', mechanism)
      .where('length', '>=', minLength)
      .where('length', '<=', maxLength)*!/
      .where('price', '>=', minPrice)
      .where('price', '<=', maxPrice))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }*/

  type = (path: string, types: string[],
          minPrice: number = 0, maxPrice: number = 100000): Observable<any> => {
    return this.fireStore.collection(path, ref => ref.where('type', 'in', types)
      .where('price', '>=', minPrice)
      .where('price', '<=', maxPrice))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

  mechanism = (path: string, mechanism: string[],
               minLength: string = '0', maxLength: string = '10000'): Observable<any> => {


    const a = Number(minLength);
    const b = Number(maxLength);
    console.log(a, b);
    return this.fireStore.collection(path, ref => ref.where('mechanism', 'in', mechanism)
       .where('length', '>=', a)
       .where('length', '<=', b))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => ({id: doc.payload.doc.id, info: doc.payload.doc.data()}))));
  }

 /* itog = (path: string, types: string[],
          minPrice: number = 0, maxPrice: number = 100000,
          mechanism: string[],
          minLength: number = 0, maxLength: number = 10000): Observable<any> => {
    return this.fireStore.collection(path, ref => ref.where('type', 'in', types)
      .where('price', '>=', minPrice)
      .where('price', '<=', maxPrice))
      .snapshotChanges()
      .pipe(map( res => res.map( doc => doc.payload.doc.id)),

    mergeMap( (res: Observable<string[]>): Observable<any> => {
     return  this.fireStore.collection('sofas', ref => ref.where( ref.id, 'in', res )
        .where('mechanism', 'in', mechanism)
        .where('length', '>=', minLength)
        .where('length', '<=', maxLength)).snapshotChanges().pipe(
        map( res => res.map(item => ({id: item.payload.doc.id, info: item.payload.doc.data()}))
      ));
    }));
  }*/

 /* m = (arr: string[], mechanism: string[]): Observable<any> => {
    return this.fireStore.collection('sofas', ref => ref.where( ref.id, 'in', arr )
      .where('mechanism', 'in', mechanism)).snapshotChanges().pipe(
      map( res => res.map(item => item.payload.doc.id))
    );
  }*/

}
