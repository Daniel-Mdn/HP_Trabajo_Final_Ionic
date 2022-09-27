import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, concat } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ICategoria, ILineaPedido, IParams } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class LineaPedidoService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="lineas_pedido"

  listLineasPedido$:BehaviorSubject<ILineaPedido[]>= new BehaviorSubject<ILineaPedido[]>([] as ILineaPedido[])
  
  public get getLineasPedido$(){
    return this.listLineasPedido$.asObservable();
  }
  public setLineasPedido$(list:ILineaPedido[]):void{
    this.listLineasPedido$.next(list);
  }
  public getLineasPedido():Observable<ILineaPedido[]> {
    return super.getAll(this.path);
  }
  public getLineasPedidoId(params?:IParams):Observable<ILineaPedido[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          const data = a.payload.doc.data() as ILineaPedido;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }
  public getLineaPedido(id: string):Observable<ILineaPedido> {
    return super.getOne(this.path, id);
  }
  public deleteLineasPedido(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updateLineaPedido(id: string, data: ILineaPedido) {
    return super.updateOne(this.path, id, data)
  }
  public createLineaPedido( data: ILineaPedido):Promise<string|undefined> {
    return super.createOne(this.path, data)
  }

  public createLineaPedidoWithId( id: string, data: ILineaPedido):Promise<void> {
    return this.createOneByID(this.path, id, data);
  }

}
