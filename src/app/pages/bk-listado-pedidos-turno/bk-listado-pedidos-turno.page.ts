import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categorias, estadosPedido } from 'src/app/constants/constants';
import { IDomicilio, ILineaPedido, IPedido } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-bk-listado-pedidos-turno',
  templateUrl: './bk-listado-pedidos-turno.page.html',
  styleUrls: ['./bk-listado-pedidos-turno.page.scss'],
})
export class BkListadoPedidosTurnoPage implements OnInit {
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
    let hoy = new Date();
    let ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    ayer.setHours(23,59,59)
    console.log('hoy: ',hoy);
    console.log('ayer: ',ayer)
    // await this.storage
    //   .get('usuario')
    //   .then((value) => (this.currentUsuario = value));
    this.listaPedidos$ = this.pedidosService
      .getPedidosId({
        where: [
            { name: 'fechaPedido', validation: '<=', value: hoy },
            { name: 'fechaPedido', validation: '>', value: ayer },
        ],
        order: 'fechaPedido',
        orderOrientacion: 'desc',
      })
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

  redirectDetallePedido(id: string) {
    this.router.navigate(['/bk-pedido-detalle', id]);
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

  formatDomicilio(dom:IDomicilio){
    if (dom){
      return this.domicilioService.formatDomicilio(dom)
    }else{
      return ''
    }
  }
  goPrevPage(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  getFechaPedido(fecha: Date|Timestamp){
    return fecha as Date
  }
  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }
}
