import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class FirestoreBaseService {
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {}

  public getAll<T>(path: string):Observable<T[]> {
    return this.firestore.collection<T>(path).valueChanges();
  }
  public getAllId<T>(path: string):AngularFirestoreCollection<T> {
    return this.firestore.collection<T>(path);
  }
  public getOne<T>(path: string, id: string):Observable<T> {
    return this.firestore.doc<T>(path + '/' + id).valueChanges();
  }
  public deleteOne<T>(path: string, id: string):Promise<void> {
    return this.firestore.doc(path + '/' + id).delete();
  }
  public updateOne<T>(path: string, id: string, data: T): Observable<T> {
    this.firestore.doc(path + '/' + id).update(data);
    return this.firestore.doc<T>(path + '/' + id).valueChanges();
  }
  public createOne<T>(path: string, data: any):Promise<void> {
    const id = this.firestore.createId();
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.doc(id).set(data);
  }
  public createOneByID<T>(path: string, id: string, data: any):Promise<void>  {
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.doc(id).set(data);
  }
  public stateCollection(path: string) {
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.stateChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
