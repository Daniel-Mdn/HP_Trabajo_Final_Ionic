import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { formasPago, PrecioEnvioEnum, TypeEnvioEnum } from 'src/app/constants/constants';
import { IPedido, ILineaPedido, IEnvio, IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.page.html',
  styleUrls: ['./confirmar-pedido.page.scss'],
})
export class ConfirmarPedidoPage implements OnInit {
  constructor(
    private pedidoService: PedidoService,
    private lineasPedidoService: LineaPedidoService,
    private router: Router,
    private domicilioService: DomicilioService,
    private storage:StorageService
  ) {
    this.storage.get('usuario').then((val) => {
      this.usuario=val;
    });
  }
  
  usuario:string;
  notasPedido: FormControl = new FormControl(null);
  envio: IEnvio = {
    service: TypeEnvioEnum.Cadete,
    price: PrecioEnvioEnum.Cadete,
  };
  pedido: IPedido = {} as IPedido;
  pedido$: Observable<IPedido> = of();
  lineasPedido$: Observable<ILineaPedido[]> = of();
  lineasPedido: ILineaPedido[] = [];
  currentDomicilio:IDomicilio={} as IDomicilio;
  async ngOnInit() {
    await this.pedidoService.currentPedidos$.subscribe((ped) => {
      this.pedido = ped;
    });
    await this.lineasPedidoService.getLineasPedido$.subscribe((lineas) => {
      this.lineasPedido = lineas;
    });
    this.domicilioService.getCurrentDomicilio$.subscribe((dom) => {
      if (Object.entries(dom).length !== 0) {
        this.currentDomicilio = dom;
      }
    });
  }

  async navigateTodetailPedido() {
    this.pedido.envio = this.envio;
    this.pedido.idDomicilio=this.currentDomicilio.id;
    this.pedido.notasPedido=this.notasPedido.value;
    this.pedido.formaDePago=formasPago.Efectivo;
    this.pedido.idUsuario=this.usuario;
    this.pedidoService.setCurrentPedido$(this.pedido);
    let pedidoId;
    await this.pedidoService.createPedido(this.pedido).then((id)=>pedidoId=id);
    let lineasIds = [];
    const lineas= this.lineasPedido;
    lineas.forEach((linea) => {
      linea.idPedido=pedidoId;
      this.lineasPedidoService
        .createLineaPedido(linea)
        .then((value) => lineasIds.push(value));
    });
    this.pedidoService.setCurrentPedido$({} as IPedido);
    this.lineasPedidoService.setLineasPedido$([]);
    this.router.navigate(['/detalle-pedido', pedidoId]);
  }
  
  formatDomicilio(): string {
    let depto: string;
    if (this.currentDomicilio.dpto && this.currentDomicilio.piso) {
      depto = this.currentDomicilio.piso + ' ' + this.currentDomicilio.dpto;
    }
    return (
      this.currentDomicilio.calle +
      ' ' +
      this.currentDomicilio.nroCasa +
      ', ' +
      (depto ? depto + ', ' : '') +
      this.currentDomicilio.idLocalidad
    );
  }
}
