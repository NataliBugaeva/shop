import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Sofa} from '../../model';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilterService {


  constructor(public fireStore: AngularFirestore) { }

  getAllSofas(): Observable<Sofa[]> {
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

}
