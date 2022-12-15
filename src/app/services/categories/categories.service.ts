import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategoria, IParams } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="categoria"

  listCategories$:BehaviorSubject<ICategoria[]>= new BehaviorSubject<ICategoria[]>([] as ICategoria[])

  public get getCategories$(){
    return this.listCategories$.asObservable();
  }
  public setCategories$(list:ICategoria[]):void{
    this.listCategories$.next(list);
  }
  
  public getCategories():Observable<ICategoria[]> {
    return super.getAll(this.path);
  }
  public getCategoriesId(params?:IParams):Observable<ICategoria[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          const data = a.payload.doc.data() as ICategoria;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }
  public getCategory(id: string):Observable<ICategoria> {
    return super.getOne(this.path, id);
  }
  public deleteCategory(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateCategory(id: string, data: ICategoria) {
    return super.updateOne(this.path, id, data)
  }
  public createCategory( data: ICategoria):Promise<string|undefined> {
    return super.createOne(this.path, data)
  }

  public createCategoryWithId( id: string, data: ICategoria):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }
}
