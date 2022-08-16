import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { IProducto } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="productos"
  
  public getProducts():Observable<IProducto[]> {
    return super.getAll(this.path);
  }
  public getProduct(id: string):Observable<IProducto> {
    return super.getOne(this.path, id);
  }
  public deleteUser(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateUser(id: string, data: IProducto) {
    return super.updateOne(this.path, id, data)
  }
  public createUser( data: IProducto):Promise<void> {
    return super.createOne(this.path, data)
  }

  public createUserWithId( id: string, data: IProducto):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }

}
