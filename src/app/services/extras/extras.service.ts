import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { async } from '@firebase/util';
import { BehaviorSubject, interval, Observable, zip } from 'rxjs';
import { delayWhen, first, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  ICategoria,
  IExtras,
  IHistorialExtras,
  IParams,
} from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root',
})
export class ExtrasService extends FirestoreBaseService {
  constructor(firestore: AngularFirestore) {
    super(firestore);
  }
  historial: IHistorialExtras[];

  path = 'extras';
  pathHistory = 'extras/';

  listExtras$: BehaviorSubject<IExtras[]> = new BehaviorSubject<IExtras[]>(
    [] as IExtras[]
  );

  public get getExtras$() {
    return this.listExtras$.asObservable();
  }
  public setExtras$(list: IExtras[]): void {
    this.listExtras$.next(list);
  }

  public getExtras(): Observable<IExtras[]> {
    return super.getAll(this.path);
  }
  public getExtrasId(params?: IParams): Observable<IExtras[]> {
      return super
      .getAllId(this.path, params)
      .stateChanges(['added'])
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as IExtras;
            const histPath = a.payload.doc.ref.path;
            const id = a.payload.doc.id;
            return { id, ...data, histPath };
          })
        )
      );
  }
  public getExtra(id: string): Observable<IExtras> {
    return super.getOne(this.path, id);
  }
  public deleteExtra(id: string): Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateExtra(id: string, data: IExtras) {
    return super.updateOne(this.path, id, data);
  }
  public createExtra(data: IExtras): Promise<string|undefined> {
    return super.createOne(this.path, data);
  }

  public createExtraWithId(id: string, data: IExtras): Promise<void> {
    return this.createOneByID(this.path, id, data);
  }
}
