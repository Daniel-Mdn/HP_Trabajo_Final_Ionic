import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map, reduce, scan } from 'rxjs/operators';
import { Categorias, estadosPedido } from 'src/app/constants/constants';
import {
  IDomicilio,
  ILineaPedido,
  IPedido,
} from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
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
  currentUsuario: string;
  estadosPedido = estadosPedido;
  constructor(
    private menu: MenuController,
    private router: Router,
    private pedidosService: PedidoService,
    private storage: StorageService,
    private lineaPedidoService: LineaPedidoService,
    private domicilioService: DomicilioService
  ) {}

  async ngOnInit() {
    console.log('hola');
    await this.storage
      .get('usuario')
      .then((value) => (this.currentUsuario = value));
    
    this.listaPedidos$= this.pedidosService
      .getPedidosId({
        where: [
          {
            name: 'idUsuario',
            validation: '==',
            value: this.currentUsuario,
          },
        ],
        order: 'fechaPedido',
        orderOrientacion: 'desc',
      })
      .pipe(scan((action, secondAction) => action.concat(secondAction), []))
      .pipe(
        map((res) => {
          res.forEach((pedido) => {
            this.domicilioService
              .getDomicilio(pedido.idDomicilio)
              .subscribe((dom) => {
                pedido.domicilio = dom;
              });
            this.lineaPedidoService
              .getLineasPedidoId({
                where: [
                  { name: 'idPedido', validation: '==', value: pedido.id },
                ],
              })
              .subscribe((lineas) => {
                if (lineas) {
                  pedido.lineasPedido = lineas;
                }
              });
          });
          return res;
        })
      )
      this.listaPedidos$.subscribe((r)=>console.log(r))
  }

  redirectDetallePedido(id: string) {
    this.router.navigate(['/detalle-pedido', id]);
  }
  getNombreCategoria(idCategoria: string) {
    switch (idCategoria) {
      case Categorias.PizzasParrilla: {
        return 'pizza a la parrilla';
      }
      case Categorias.PizzasMolde: {
        return 'pizza al molde';
      }
      case Categorias.Hamburguesas: {
        return 'hamburguesa';
      }
      default: {
        return 'sin categoria';
      }
    }
  }

  formatDomicilio(dom: IDomicilio) {
    return dom ? this.domicilioService.formatDomicilio(dom) : '';
  }
}
