import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IDomicilio, IParams } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DomicilioService extends FirestoreBaseService {
  constructor(firestore: AngularFirestore, private storage: StorageService) {
    super(firestore);
  }
  path = 'domicilios';

  listaDomicilios$: BehaviorSubject<IDomicilio[]> = new BehaviorSubject<
    IDomicilio[]
  >([] as IDomicilio[]);

  currentDomicilio$: BehaviorSubject<IDomicilio> =
    new BehaviorSubject<IDomicilio>({} as IDomicilio);

  public get getDomicilios$() {
    return this.listaDomicilios$.asObservable();
  }
  public setDomicilios$(list: IDomicilio[]): void {
    this.listaDomicilios$.next(list);
  }

  public get getCurrentDomicilio$() {
    return this.currentDomicilio$.asObservable();
  }
  public setCurrentDomicilio$(dom: IDomicilio): void {
    this.currentDomicilio$.next(dom);
  }

  public getDomicilios(): Observable<IDomicilio[]> {
    return super.getAll(this.path);
  }
  public getDomiciliosId(params?: IParams): Observable<IDomicilio[]> {
    return super
      .getAllId(this.path, params)
      .stateChanges(['added'])
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as IDomicilio;
            const id = a.payload.doc.id;
            data.id=id
            return { id, ...data };
          })
        )
      );
  }
  public getDomicilio(id: string): Observable<IDomicilio> {
    return super.getOne(this.path, id);
  }
  public deleteDomicilio(id: string): Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateDomicilio(id: string, data: IDomicilio) {
    return super.updateOne(this.path, id, data);
  }
  public createDomicilio(data: IDomicilio): Promise<string | undefined> {
    return super.createOne(this.path, data);
  }

  public createDomicilioWithId(id: string, data: IDomicilio): Promise<void> {
    return this.createOneByID(this.path, id, data);
  }

  public async recargarDomiciliosWithId(params?: IParams) {
  }

  public formatDomicilio(currentDomicilio:IDomicilio): string {
    let depto: string;
    if (currentDomicilio?.dpto && currentDomicilio?.piso) {
      depto = currentDomicilio.piso + ' ' + currentDomicilio.dpto;
    }
    return (
      currentDomicilio.calle +
      ' ' +
      currentDomicilio.nroCasa +
      ', ' +
      (depto ? depto + ', ' : '') +
      currentDomicilio.idLocalidad
    );
  }
}
