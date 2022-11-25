import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  Query,
} from '@angular/fire/compat/firestore';
import { orderBy, query, QueryConstraint, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParams } from '../constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FirestoreBaseService {
  private itemsCollection: AngularFirestoreCollection<any>;
  queryData: Query<DocumentData>;
  wheresData: QueryConstraint[];
  orderData: QueryConstraint;

  constructor(public firestore: AngularFirestore) {}

  public getAll<T>(path: string): Observable<T[]> {
    return this.firestore.collection<T>(path).valueChanges();
  }
  public getAllId<T>(
    path: string,
    params?: IParams
  ): AngularFirestoreCollection<T> {
    // if (params.where && params.where?.length){
    //   params.where.forEach((w)=>{
    //     this.wheresData.push(where(w.name, '==', w.value))
    //   })
    // }
    // if (params.order){
    //   this.orderData=orderBy(params.order)
    // }
    // const q= query(this.queryData, ...this.wheresData, this.orderData);
    let list = this.firestore.collection<T>(path, (ref) => {
      this.queryData = ref;

      if (params) {
        if (params.where) {
          params.where.forEach((w) => {
            this.queryData = this.queryData.where(
              w.name,
              w.validation,
              w.value
            );
          });
        }
        if (params.order) {
          this.queryData = this.queryData.orderBy(params.order,(params.orderOrientacion??'asc') );
        }
      }
      return this.queryData;
    });
    return list;
  }
  public getOne<T>(path: string, id: string): Observable<T> {
    return this.firestore.doc<T>(path + '/' + id).valueChanges();
  }
  public deleteOne<T>(path: string, id: string): Promise<void> {
    return this.firestore.doc(path + '/' + id).delete();
  }
  public updateOne<T>(path: string, id: string, data: T): Observable<T> {
    console.log(data)
    this.firestore.doc(path + '/' + id).update(data);
    return this.firestore.doc<T>(path + '/' + id).valueChanges();
  }
  public createOne<T>(path: string, data: any): Promise<string|undefined> {
    const id = this.firestore.createId();
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection
      .doc(id)
      .set(data)
      .then(
        () => id,
        () => undefined
      );
  }
  public createOneByID<T>(path: string, id: string, data: any): Promise<void> {
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.doc(id).set(data);
  }
  public stateCollection(path: string) {
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.stateChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
}
