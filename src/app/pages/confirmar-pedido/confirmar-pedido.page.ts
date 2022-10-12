import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrecioEnvioEnum, TypeEnvioEnum } from 'src/app/constants/constants';
import { IPedido, ILineaPedido, IEnvio } from 'src/app/constants/interfaces';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.page.html',
  styleUrls: ['./confirmar-pedido.page.scss'],
})
export class ConfirmarPedidoPage implements OnInit {
  constructor(
    private pedidoService: PedidoService,
    private lineasPedidoService: LineaPedidoService,
    private router: Router
  ) {}

  notasPedido: FormControl = new FormControl(null);
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
    });
    await this.lineasPedidoService.getLineasPedido$.subscribe((lineas) => {
      this.lineasPedido = lineas;
    });
  }

  async navigateTodetailPedido() {
    this.pedido.envio = this.envio;
    this.pedidoService.setCurrentPedido$(this.pedido);
    let pedidoId;
    await this.pedidoService.createPedido(this.pedido).then((id)=>pedidoId=id);
    let lineasIds = [];
    this.lineasPedido.forEach((linea) => {
      linea.idPedido=pedidoId;
      this.lineasPedidoService
        .createLineaPedido(linea)
        .then((value) => lineasIds.push(value));
    });
    console.log(lineasIds)
    this.router.navigate(['/detalle-pedido']);
  }
}
