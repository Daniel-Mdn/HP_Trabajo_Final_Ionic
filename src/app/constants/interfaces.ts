import { Tamaños } from "./constants";

export interface Productos{
    id:number,
    nombre:string,
    descProd:string,
    disponibilidad:boolean,
    baja:boolean,
    imagen?:File,
    tamanio:Tamaños,
    idCat:number,
}
export interface Categoria{
    id:number,
    descCat:string,
}

export interface Usuario{
    nombre:string,
    apellido:string
}