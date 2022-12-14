import { DocumentReference, OrderByDirection, Timestamp, WhereFilterOp } from "firebase/firestore";
import { Observable } from "rxjs";
import { PrecioEnvioEnum, Tamanios, TypeEnvioEnum, whereDateFilter } from "./constants";

export interface IProducto{
    id?:string,
    nombre:string,
    descProd:string,
    disponibilidad:boolean,
    baja:boolean,
    precio?:number,
    imagen?:string,
    tamanio:Tamanios,
    idCategoria:string,
    categoria?:ICategoria
    historial_precio?:IHistorialPrecio[],
    histPath?:string,
    histPaths?:{tamanio:Tamanios, hist:string}[],
    extrasProducto?: IExtras[]
}

export interface IEnvio{
    service:TypeEnvioEnum,
    price:PrecioEnvioEnum
}
export interface IPedido{
    id?:string,
    fechaPedido: Date|Timestamp,
    estadoPedido:string,
    notasPedido:string,
    entregaRealPed:Date,
    retiroLocalPed:Date,
    total?:number,
    formaDePago:string,
    envio?:IEnvio,
    idSucursal:string,
    idUsuario?:string,
    idDomicilio?:string,
    domicilio?:IDomicilio,
    lineasPedido?:ILineaPedido[],
    estadoPago?:string
}
export interface ILineaPedido{
    id?:string,
    subtotal:number,
    totalProducto:number,
    cantidad:number,
    notasDeProducto:string,
    idPedido?:string,
    idProducto:string,
    producto?:IProducto
}
export interface ICategoria{
    id:string,
    descCategoria:string,
}
export interface IExtras{
    id?:string,
    cantidad?:number,
    precio?:number,
    descExtra:string,
    idLineaDePed?:number,
    historial_extra?:IHistorialExtras[],
    histPath?:string,
}

export interface IUsuario{
    id?:string;
    email?:string;
    nombre:string,
    apellido:string,
    fechaNac:Date,
    nroTelefono:string,
    rol:string
}

export interface IParams{
    order?:string,
    orderOrientacion?:OrderByDirection,
    where?:IWhere[],
    whereDate?:IWhereDate[]
}
export interface IWhere{
    name:string,
    validation:WhereFilterOp,
    value:string|Date|string[]
}
export interface IWhereDate{
    validation:whereDateFilter,
    value:string
}

export interface IHistorialExtras{
    fechaDesde:Date,
    precioExtra: number
}

export interface IHistorialPrecio{
    fechaDesde:Date,
    precioProd: number,
    tamanio:Tamanios
}
export interface IDomicilio{
    id?:string,
    calle:string,
    dpto?:string,
    idUsuario:string,
    idLocalidad:string,
    idProvincia:string,
    nroCasa:string,
    piso?:string,
    estaActivo?:boolean
    domiObs:string
}
export interface ILocalidad{
    id:string,
    cpLoc:string
    descLoc:string
    idProvincia:string
}
export interface IProvincia{
    id:string,
    descProv:string
}