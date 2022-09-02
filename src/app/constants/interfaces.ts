import { DocumentReference } from "firebase/firestore";
import { Tamanios } from "./constants";

export interface IProducto{
    id:string,
    nombre:string,
    descProd:string,
    disponibilidad:boolean,
    baja:boolean,
    imagen?:File,
    tamanio:Tamanios,
    idCategoria:string,
    categoria?:ICategoria
}
export interface ICategoria{
    id:string,
    descCategoria:string,
}

export interface IUsuario{
    nombre:string,
    apellido:string
}

export interface IParams{
    order?:string,
    where?:IWhere[]
}
export interface IWhere{
    name:string,
    value:string
}