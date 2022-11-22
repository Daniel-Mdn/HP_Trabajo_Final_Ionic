import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParams, IProvincia } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="provincia"

  listaProvincias$:BehaviorSubject<IProvincia[]>= new BehaviorSubject<IProvincia[]>([] as IProvincia[])

  public get getProvincias$(){
    return this.listaProvincias$.asObservable();
  }
  public setProvincias$(list:IProvincia[]):void{
    this.listaProvincias$.next(list);
  }

  public getProvincias():Observable<IProvincia[]> {
    return super.getAll(this.path);
  }
  public getProvinciasId(params?:IParams):Observable<IProvincia[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          const data = a.payload.doc.data() as IProvincia;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }
  public getProvincia(id: string):Observable<IProvincia> {
    return super.getOne(this.path, id);
  }
  public deleteProvincia(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateProvincia(id: string, data: IProvincia) {
    return super.updateOne(this.path, id, data)
  }
  public createProvincia( data: IProvincia):Promise<string|undefined> {
    return super.createOne(this.path, data)
  }

  public createProvinciaWithId( id: string, data: IProvincia):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }
}
