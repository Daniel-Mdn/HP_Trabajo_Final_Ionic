import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocalidad, IParams } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="localidad"

  listaLocalidades$:BehaviorSubject<ILocalidad[]>= new BehaviorSubject<ILocalidad[]>([] as ILocalidad[])

  public get getLocalidades$(){
    return this.listaLocalidades$.asObservable();
  }
  public setLocalidades$(list:ILocalidad[]):void{
    this.listaLocalidades$.next(list);
  }

  public getLocalidades():Observable<ILocalidad[]> {
    return super.getAll(this.path);
  }
  public getLocalidadesId(params?:IParams):Observable<ILocalidad[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          const data = a.payload.doc.data() as ILocalidad;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }
  public getLocalidad(id: string):Observable<ILocalidad> {
    return super.getOne(this.path, id);
  }
  public deleteLocalidad(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateLocalidad(id: string, data: ILocalidad) {
    return super.updateOne(this.path, id, data)
  }
  public createLocalidad( data: ILocalidad):Promise<string|undefined> {
    return super.createOne(this.path, data)
  }

  public createLocalidadWithId( id: string, data: ILocalidad):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }
}
