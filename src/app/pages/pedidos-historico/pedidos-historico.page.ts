import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categorias, estadosPedido } from 'src/app/constants/constants';
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
  currentUsuario: string;
  estadosPedido = estadosPedido;
  constructor(
    private menu: MenuController,
    private router: Router,
    private pedidosService: PedidoService,
    private storage: StorageService,
    private lineaPedidoService: LineaPedidoService
  ) {}

  async ngOnInit() {
    // await this.storage
    //   .get('usuario')
    //   .then((value) => (this.currentUsuario = value));
    this.listaPedidos$ = this.pedidosService
      .getPedidosId({
        where: [
          {
            name: 'idUsuario',
            validation: '==',
            value: 'danielmedina012@gmail.com',
          },
        ],
        order: 'fechaPedido',
        orderOrientacion: 'desc',
      })
      .pipe(
        map((res) => {
          res.forEach((pedido) => {
            this.lineaPedidoService
              .getLineasPedidoId({
                where: [
                  { name: 'idPedido', validation: '==', value: pedido.id },
                ],
              })
              .subscribe((lineas) => {
                console.log('lineas');
                console.log('lineas', lineas);
                if (lineas) {
                  pedido.lineasPedido = lineas;
                }
              });
          });
          return res;
        })
      );
  }

  redirectDetallePedido() {
    this.router.navigate(['/detalle-pedido']);
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
        return 'sin categoria'
      }
    }
  }
}
