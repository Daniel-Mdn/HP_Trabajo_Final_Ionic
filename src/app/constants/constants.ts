export enum Categorias{
    Hamburguesas="hamburguesas",
    DescHamburguesas="Medallón de Carne",
    PizzasMolde="pizzaAlMolde",
    PizzasParrilla="pizzaAlaParrilla"
}
export enum Tamanios{
    Grande="grande",
    Mediana="mediana",
    Simple="simple",
    Doble="doble"
}
export interface ITamanios{
    id:string,
    tamanio:string
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
export enum estadosPedido{
    Pendiente="pendiente",
    Preparacion="en preparacion",
    Entregado="entregado",
    EnCamino="en camino",
    Cancelado="cancelado"
}