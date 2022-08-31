import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICategoria } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="categoria"
  
  public getCategories():Observable<ICategoria[]> {
    return super.getAll(this.path);
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
  public createCategory( data: ICategoria):Promise<void> {
    return super.createOne(this.path, data)
  }

  public createCategoryWithId( id: string, data: ICategoria):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }
}
