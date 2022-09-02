import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, concat } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ICategoria, IParams, IProducto } from 'src/app/constants/interfaces';
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

  listProducts$:BehaviorSubject<IProducto[]>= new BehaviorSubject<IProducto[]>([] as IProducto[])
  
  public get getProducts$(){
    return this.listProducts$.asObservable();
  }
  public setProducts$(list:IProducto[]):void{
    this.listProducts$.next(list);
  }
  public getProducts():Observable<IProducto[]> {
    return super.getAll(this.path);
  }
  public getProductsId(params?:IParams):Observable<IProducto[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          const data = a.payload.doc.data() as IProducto;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
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
