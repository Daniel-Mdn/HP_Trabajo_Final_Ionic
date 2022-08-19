import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { concat } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ICategoria, IProducto } from 'src/app/constants/interfaces';
import { CategoriesService } from '../categories/categories.service';
import { FirestoreBaseService } from '../firestore-base.service';

export interface ProductosCategorias{
  productos:IProducto[],
  categorias:ICategoria[]
}
@Injectable({
  providedIn: 'root'
})
export class ProductoService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="productos"
  categories:ICategoria[]=[];
  
  public getProducts():Observable<IProducto[]> {
    return super.getAll(this.path);
  }
  public getProduct(id: string):Observable<IProducto> {
    return super.getOne(this.path, id);
  }
  public deleteProduct(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateProduct(id: string, data: IProducto) {
    return super.updateOne(this.path, id, data)
  }
  public createProduct( data: IProducto):Promise<void> {
    return super.createOne(this.path, data)
  }

  public createProductWithId( id: string, data: IProducto):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }

}
