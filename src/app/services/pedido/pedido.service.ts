import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { BehaviorSubject, concat, merge } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, reduce } from 'rxjs/operators';
import { IParams, IPedido, IProducto } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from '../firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends FirestoreBaseService {

  constructor(firestore: AngularFirestore) { 
    super(firestore)
  }
  path="pedidos"

  listPedidos$:BehaviorSubject<IPedido[]>= new BehaviorSubject<IPedido[]>([] as IPedido[])
  currentPedidos$:BehaviorSubject<IPedido>= new BehaviorSubject<IPedido>({} as IPedido)
  
  public get getPedidos$(){
    return this.listPedidos$.asObservable();
  }
  public setPedidos$(list:IPedido[]):void{
    this.listPedidos$.next(list);
  }
  public get getCurrentPedido$(){
    return this.currentPedidos$.asObservable();
  }
  public setCurrentPedido$(ped:IPedido):void{
    this.currentPedidos$.next(ped);
  }
  public getPedidos():Observable<IPedido[]> {
    return super.getAll(this.path);
  }
  public getPedidosId(params?:IParams):Observable<IPedido[]> {
    return super.getAllId(this.path, params).stateChanges(['added']).pipe(
      map(actions=>actions.map(a=>
        {
          let doc= a.payload.doc.data() as IPedido;
          doc.fechaPedido=(doc.fechaPedido as Timestamp).toDate();
          const data = doc;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    )
  }
  public getPedido(id: string):Observable<IPedido> {
    return super.getOne(this.path, id);
  }
  public deletePedido(id: string):Promise<void> {
    return super.deleteOne(this.path, id);
  }
  public updatePedido(id: string, data: IPedido) {
    return super.updateOne(this.path, id, data)
  }
  public createPedido( data: IPedido):Promise<string|undefined> {
    return super.createOne(this.path, data)
  }

  public createPedidoWithId( id: string, data: IPedido):Promise<void> {
    return this.createOneByID(this.path, id, data)
  }

}
