import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PrecioEnvioEnum, TypeEnvioEnum } from 'src/app/constants/constants';
import { IEnvio, ILineaPedido, IPedido } from 'src/app/constants/interfaces';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {
  constructor(
    private pedidoService: PedidoService,
    private lineasPedidoService: LineaPedidoService
  ) {}

  envio: IEnvio = {
    service: TypeEnvioEnum.Cadete,
    price: PrecioEnvioEnum.Cadete,
  };
  pedido: IPedido = {} as IPedido;
  pedido$: Observable<IPedido> = of();
  lineasPedido$: Observable<ILineaPedido[]> = of();
  lineasPedido: ILineaPedido[] = [];
  async ngOnInit() {
    await this.pedidoService.currentPedidos$.subscribe((ped) => {
      this.pedido = ped;
      this.pedido.total = this.pedido.total + Number(this.envio.price);
    });
    await this.lineasPedidoService.getLineasPedido$.subscribe((lineas) => {
      this.lineasPedido = lineas;
    });
  }
}
