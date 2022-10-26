import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { estadosPedido } from 'src/app/constants/constants';
import { ILineaPedido, IPedido } from 'src/app/constants/interfaces';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-pedidos-historico',
  templateUrl: './pedidos-historico.page.html',
  styleUrls: ['./pedidos-historico.page.scss'],
})
export class PedidosHistoricoPage implements OnInit {
  listaPedidos$: Observable<IPedido[]> = from([]);
  listaLineasPedido$: Observable<ILineaPedido[]> = from([]);
  pedidosEnPreparacion: IPedido[];
  pedidosEntregado: IPedido[];
  currentUsuario: string;
  constructor(
    private menu: MenuController,
    private router: Router,
    private pedidosService: PedidoService,
    private storage: StorageService,
    private lineaPedidoService: LineaPedidoService
  ) {}

  async ngOnInit() {
    await this.storage
      .get('usuario')
      .then((value) => (this.currentUsuario = value));
    this.listaPedidos$ = this.pedidosService.getPedidosId({
      where: [
        { name: 'idUsuario', validation: '==', value: this.currentUsuario },
      ],
    });
    this.listaPedidos$.subscribe((res) => {
      res.forEach((pedido) => {
        this.lineaPedidoService.getLineasPedidoId({where:[{name:'idPedido', validation:'==', value:pedido.id}]}).subscribe((lineas)=>{
          if (lineas){
            pedido.lineasPedido=lineas
          }
          debugger
          switch (pedido.estadoPedido) {
            case estadosPedido.Entregado: {
              this.pedidosEntregado.push(pedido);
              break;
            }
            case estadosPedido.Preparacion: {
              console.log(pedido)
              this.pedidosEnPreparacion.push(pedido);
              break;
            }
            default: {
              break;
            }
          }
        })
      });
    });
  }

  redirectDetallePedido() {
    this.router.navigate(['/detalle-pedido']);
  }
}
