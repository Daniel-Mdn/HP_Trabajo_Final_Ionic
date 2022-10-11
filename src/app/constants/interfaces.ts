import { DocumentReference, WhereFilterOp } from "firebase/firestore";
import { Observable } from "rxjs";
import { Tamanios } from "./constants";

export interface IProducto{
    id:string,
    nombre:string,
    descProd:string,
    disponibilidad:boolean,
    baja:boolean,
    precio?:number,
    imagen?:string,
    tamanio:Tamanios,
    idCategoria:string,
    categoria?:ICategoria
    historial_precio:IHistorialPrecio[],
    histPath:string,

}

export interface IPedido{
    id?:string,
    fechaPedido: Date,
    estadoPedido:string,
    notasPedido:string,
    entregaRealPed:Date,
    retiroLocalPed:Date,
    total?:number,
    formaDePago:string,
    idSucursal:string,
    idUsuario?:string
}
export interface ILineaPedido{
    id?:string,
    subtotal:number,
    cantidad:number,
    notasDeProducto:string,
    idPedido?:string,
    idProducto:string,
}
export interface ICategoria{
    id:string,
    descCategoria:string,
}
export interface IExtras{
    id:string,
    cantidad?:number,
    precio?:number,
    descExtra:string,
    idLineaDePed?:number,
    historial_extra:IHistorialExtras[],
    histPath:string,
}

export interface IUsuario{
    nombre:string,
    apellido:string,
    fechaNac:Date,
    nroTelefono:string
}

export interface IParams{
    order?:string,
    where?:IWhere[]
}
export interface IWhere{
    name:string,
    validation:WhereFilterOp,
    value:string
}

export interface IHistorialExtras{
    fechaDesde:Date,
    precioExtra: number
}

export interface IHistorialPrecio{
    fechaDesde:Date,
    precioProd: number
}