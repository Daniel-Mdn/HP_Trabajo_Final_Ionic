import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParams, IUsuario } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="usuarios"
  
  public getUsers():Observable<IUsuario[]> {
    return super.getAll(this.path);
  }
  listaUsuarios$:BehaviorSubject<IUsuario[]>= new BehaviorSubject<IUsuario[]>([] as IUsuario[])

  public get getUsuarios$(){
    return this.listaUsuarios$.asObservable();
  }
  public setUsuarios$(list:IUsuario[]):void{
    this.listaUsuarios$.next(list);
  }
  public getUsersId(params?: IParams):Observable<IUsuario[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          const histPath = a.payload.doc.ref.path;
          const data = a.payload.doc.data() as IUsuario;
          const id = a.payload.doc.id;
          return { id, ...data, histPath };
        }))
    );  }
  public getUser(id: string):Observable<IUsuario> {
    return super.getOne(this.path, id);
  }
  public deleteUser(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateUser(id: string, data: IUsuario) {
    return super.updateOne(this.path, id, data)
  }
  public createUser( data: IUsuario):Promise<string|undefined> {
    return super.createOne(this.path, data)
  }

  public createUserWithId( id: string, data: IUsuario):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }

}
