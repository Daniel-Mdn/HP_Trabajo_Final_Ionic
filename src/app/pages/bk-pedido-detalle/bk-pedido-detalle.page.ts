import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrecioEnvioEnum, TypeEnvioEnum } from 'src/app/constants/constants';
import {
  IDomicilio,
  IEnvio,
  ILineaPedido,
  IPedido,
  IUsuario,
} from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Categorias, estadosPedido } from 'src/app/constants/constants';
import { AlertController } from '@ionic/angular';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-bk-pedido-detalle',
  templateUrl: './bk-pedido-detalle.page.html',
  styleUrls: ['./bk-pedido-detalle.page.scss'],
})
export class BkPedidoDetallePage implements OnInit {
  estadosPedido = estadosPedido;
  handlerMessage = '';

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private lineasPedidoService: LineaPedidoService,
    private domicilioService: DomicilioService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
  ) {}

  envio: IEnvio = {
    service: TypeEnvioEnum.Cadete,
    price: PrecioEnvioEnum.Cadete,
  };
  pedido: IPedido = {} as IPedido;
  pedido$: Observable<IPedido> = of();
  lineasPedido$: Observable<ILineaPedido[]> = of();
  lineasPedido: ILineaPedido[] = [];
  nombreApellido: string;
  telefono: string;
  usuario: IUsuario;
  pedidos:IPedido[];

  async ngOnInit() {
    this.pedidoService.getPedidos$.subscribe((peds)=>{
      console.log('peds', peds)
      this.pedidos=peds
    })
    this.route.params.subscribe((params) => {
      this.pedidoService.getPedido(params.pedidoId).subscribe((ped) => {
        this.pedido = ped;
        this.pedido.id = params.pedidoId;
        this.domicilioService.getDomicilio(ped.idDomicilio).subscribe((dom) => {
          this.pedido.domicilio = dom;
        });
        this.usuarioService.getUser(this.pedido.idUsuario).subscribe((usu) => {
          console.log(this.pedido.idUsuario);
          console.log(usu);
          this.nombreApellido = usu.apellido + ' ' + usu.nombre;
          this.telefono = usu.nroTelefono;
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

  redirectEstadoPedido(id: string) {
    this.router.navigate(['/bk-pedido-estado', id]);
  }

  confirmaPedido() {
    this.pedido.estadoPedido = estadosPedido.Preparacion;
    this.pedido.estadoPago = estadosPedido.Pendiente;
    this.pedidoService
      .updatePedido(this.pedido.id, this.pedido).pipe(first())
      .subscribe((ped) => {
        this.pedidos.forEach((item)=>{
          if(item.id==ped.id){
            item.estadoPedido=ped.estadoPedido
          }
        })
        this.pedidoService.setPedidos$(this.pedidos);
      });
    this.router.navigate(['/bk-listado-pedidos-turno']);
  }

  async rechazaPedido() {
    const alert = await this.alertController.create({
      header: '¿Desea rechazar el pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('alerta cancelada');
          },
        },
        {
          text: 'Rechazar',
          role: 'confirm',
          handler: () => {
            console.log('pedido rechazado');
            this.pedido.estadoPedido = 'cancelado';
            this.pedido.estadoPago = 'pendiente';
            console.log(this.pedido);
            this.pedidoService.updatePedido(this.pedido.id, this.pedido);
            this.router.navigate(['/bk-listado-pedidos-turno']);
          },
        },
      ],
    });

    await alert.present();
  }

  goPrevPage() {
    this.router.navigate(['/bk-listado-pedidos-turno']);
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }
}
