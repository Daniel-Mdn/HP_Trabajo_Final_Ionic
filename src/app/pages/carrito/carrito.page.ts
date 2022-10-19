import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILineaPedido, IPedido } from 'src/app/constants/interfaces';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private lineasService: LineaPedidoService
  ) {}

  pedido: IPedido = {} as IPedido;
  pedido$: Observable<IPedido> = of();
  lineas: ILineaPedido[] = [];
  lineas$: Observable<ILineaPedido[]> = of();
  ngOnInit() {
    this.pedido$ = this.pedidoService.currentPedidos$;
    this.lineas$ = this.lineasService.getLineasPedido$;
    this.pedidoService.currentPedidos$.subscribe((ped)=>this.pedido=ped);
    this.lineasService.getLineasPedido$.subscribe((lineas)=>this.lineas=lineas);

  }

  navigateToConfirmPedido() {
    this.router.navigate(['/confirmar-pedido']);
  }

  deleteLineaPed(index: number) {
    const precioProducto=this.lineas[index].totalProducto/this.lineas[index].cantidad;
    this.pedido.total=this.pedido.total-precioProducto;
    this.pedidoService.setCurrentPedido$(this.pedido);

    this.lineas.splice(index, 1);
      this.lineasService.setLineasPedido$(this.lineas);
  }
  addCantidadLineaPed(index: number) {
    const precioProducto=this.lineas[index].totalProducto/this.lineas[index].cantidad
      this.lineas[index].cantidad=this.lineas[index].cantidad+1;
      this.lineas[index].totalProducto=this.lineas[index].totalProducto+precioProducto;
      this.lineasService.setLineasPedido$(this.lineas);
      this.pedido.total=this.pedido.total+precioProducto;
      this.pedidoService.setCurrentPedido$(this.pedido);
  }
  restCantidadLineaPed(index: number) {
    if (this.lineas[index].cantidad>1){
        const precioProducto=this.lineas[index].totalProducto/this.lineas[index].cantidad
        this.lineas[index].cantidad=this.lineas[index].cantidad-1;
        this.lineas[index].totalProducto=this.lineas[index].totalProducto-precioProducto;
        this.lineasService.setLineasPedido$(this.lineas);
        this.pedido.total=this.pedido.total-precioProducto;
        this.pedidoService.setCurrentPedido$(this.pedido);

      }
  }
}
