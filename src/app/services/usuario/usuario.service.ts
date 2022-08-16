import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/constants/interfaces';
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
  public getUser(id: string):Observable<IUsuario> {
    return super.getOne(this.path, id);
  }
  public deleteUser(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateUser(id: string, data: IUsuario) {
    return super.updateOne(this.path, id, data)
  }
  public createUser( data: IUsuario):Promise<void> {
    return super.createOne(this.path, data)
  }

  public createUserWithId( id: string, data: IUsuario):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }

}
