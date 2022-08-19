export enum Categorias{
    Hambuerguesas="Hamburguesas",
    Pizzas="Pizzas"
}
export enum Tamanios{
    Grande="grande",
    Mediana="mediana",
    Simple="simple",
    Doble="doble"
}
export enum TamaniosHamburguesa{
    Simple="simple",
    Doble="doble"
}
export enum extrasHamburguesas{
    uno="1",
    dos="2",
    tres="3",
}
export interface Extras{
    id:string,
    cantidad:number,
    precio:number,
    descExtra:string,
    idLineaDePed:number
}