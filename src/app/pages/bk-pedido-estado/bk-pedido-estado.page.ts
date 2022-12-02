import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrecioEnvioEnum, TypeEnvioEnum, estadosPedido } from 'src/app/constants/constants';
import { IEnvio, IPedido } from 'src/app/constants/interfaces';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';

@Component({
  selector: 'app-bk-pedido-estado',
  templateUrl: './bk-pedido-estado.page.html',
  styleUrls: ['./bk-pedido-estado.page.scss'],
})
export class BkPedidoEstadoPage implements OnInit {

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private domicilioService: DomicilioService
    ) {}
   
  envio: IEnvio = {
    service: TypeEnvioEnum.Cadete,
    price: PrecioEnvioEnum.Cadete,
  };
  pedido: IPedido = {} as IPedido;
  //pedido$: Observable<IPedido> = of();
  estadosPedido = estadosPedido;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pedidoService.getPedido(params.pedidoId).subscribe((ped) => {
        this.pedido = ped;
        this.pedido.id = params.pedidoId;
        this.domicilioService.getDomicilio(ped.idDomicilio).subscribe((dom) => {
          this.pedido.domicilio = dom;
        });
      })
    })
}

  updateEstadoPedido(){}

  updateEstadoPago(){}

  goPrevPage(){
    this.router.navigate(['/bk-listado-pedidos-turno']);
  }
  
  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
