import { Tamanios } from "./constants";

export interface IProducto{
    id:number,
    nombre:string,
    descProd:string,
    disponibilidad:boolean,
    baja:boolean,
    imagen?:File,
    tamanio:Tamanios,
    idCat:number,
}
export interface ICategoria{
    id:number,
    descCat:string,
}

export interface IUsuario{
    nombre:string,
    apellido:string
}