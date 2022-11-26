import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrecioEnvioEnum, TypeEnvioEnum } from 'src/app/constants/constants';
import {
  IDomicilio,
  IEnvio,
  ILineaPedido,
  IPedido,
} from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {
  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private lineasPedidoService: LineaPedidoService,
    private domicilioService: DomicilioService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.pedidoService.getPedido(params.pedidoId).subscribe((ped) => {
        this.pedido = ped;
        this.pedido.id = params.pedidoId;
        this.domicilioService.getDomicilio(ped.idDomicilio).subscribe((dom) => {
          this.pedido.domicilio = dom;
        });
      });
      this.lineasPedidoService
        .getLineasPedidoId({
          where: [
            { name: 'idPedido', validation: '==', value: params.pedidoId },
          ],
        })
        .subscribe((lineas) => {
          this.lineasPedido = lineas;
        });
    });
  }

  envio: IEnvio = {
    service: TypeEnvioEnum.Cadete,
    price: PrecioEnvioEnum.Cadete,
  };
  pedido: IPedido = {} as IPedido;
  pedido$: Observable<IPedido> = of();
  lineasPedido$: Observable<ILineaPedido[]> = of();
  lineasPedido: ILineaPedido[] = [];

  async ngOnInit() {}

  cleanPedido(event: boolean) {
    if (event) {
      this.pedidoService.setCurrentPedido$({} as IPedido);
      this.lineasPedidoService.setLineasPedido$([]);
    }
  }

  redirectBack() {
    this.pedidoService.setCurrentPedido$({} as IPedido);
    this.lineasPedidoService.setLineasPedido$([]);
    this.router.navigate(['/pedidos-historico']);
  }

  formatDomicilio() {
    if (this.pedido.domicilio) {
      return this.domicilioService.formatDomicilio(this.pedido.domicilio);
    } else {
      return '';
    }
  }
}
