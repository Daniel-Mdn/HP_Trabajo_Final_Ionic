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
    idCategoria:DocumentReference,
    categoria?:ICategoria
}
export interface ICategoria{
    id:number,
    descCategoria:string,
}

export interface IUsuario{
    nombre:string,
    apellido:string
}