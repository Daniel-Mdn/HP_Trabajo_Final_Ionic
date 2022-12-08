import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export enum Roles{
    usuarioCliente="usuario-cliente",
    usuarioEmpleado="usuario-empleado",
    usuarioCadete="usuario-cadete"
}
export enum Categorias{
    Hamburguesas="hamburguesa",
    DescHamburguesas="Medallón de Carne",
    PizzasMolde="pizzaAlMolde",
    PizzasParrilla="pizzaALaParrilla"
}
export enum extras{
    medallon="medallon"
}
export enum Tamanios{
    Grande="grande",
    Mediana="mediana",
    Simple="simple",
    Doble="doble"
}
export enum TypeEnvioEnum{
    Cadete="cadete",
    Retiro="retiro"
}
export enum PrecioEnvioEnum{
    Cadete=300,
    Retiro=0
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
export enum estadosPago{
    Pendiente="pendiente",
    Pagado="pagado",
    PagoConCadete="pago recibido por cadete"
}
export enum formasPago{
    Efectivo="efectivo",
}
export enum whereDateFilter{
    endAt="endAt",
    startAt="startAt"
}

export function fechasValidator(fechaDesde: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = fechaDesde.value<(control.value);
      return forbidden ? {fechas: true} : null;
    };
  }