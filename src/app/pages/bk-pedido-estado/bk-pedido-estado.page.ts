import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrecioEnvioEnum, TypeEnvioEnum, estadosPedido } from 'src/app/constants/constants';
import { IEnvio, IPedido, IUsuario } from 'src/app/constants/interfaces';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

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
    private domicilioService: DomicilioService,
    private formBuilder:FormBuilder,
    private storage: StorageService,
    private usuarioService: UsuarioService

    ) {
      this.cambioEstados = this.formBuilder.group({
        estadoPedido: [''],
        estadoPago: ['']
      })
    }
  
  cambioEstados: FormGroup;
  envio: IEnvio = {
    service: TypeEnvioEnum.Cadete,
    price: PrecioEnvioEnum.Cadete,
  };
  pedido: IPedido = {} as IPedido;
  //pedido$: Observable<IPedido> = of();
  estadosPedido = estadosPedido;
  usuarioId: string;
  usuario: IUsuario;
  mensajeError: string;
  mensajeOK: string;

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pedidoService.getPedido(params.pedidoId).subscribe((ped) => {
        this.pedido = ped;
        this.pedido.id = params.pedidoId;
        this.domicilioService.getDomicilio(ped.idDomicilio).subscribe((dom) => {
          this.pedido.domicilio = dom;
        });
      })
    })
    await this.storage
      .get('usuario')
      .then((value) => (this.usuarioId = value));
    await this.usuarioService.getUser(this.usuarioId).subscribe((usu)=>{
      this.usuario = usu;
      console.log(this.usuario)
    })
}

  updateEstadoPedido(){
    this.mensajeError = '';
    this.mensajeOK = '';
    let rol = this.usuario.rol;
    switch (rol) {
      case 'usuario-cadete':
        if(this.cambioEstados.controls.estadoPedido.value=='entregado'){
          this.pedido.estadoPedido = this.cambioEstados.controls.estadoPedido.value;
          //console.log(this.pedido);
          this.pedidoService.updatePedido(this.pedido.id, this.pedido);
          this.mensajeOK = 'Estado del pedido registrado con éxito';
        } else {
          this.mensajeError = 'Su rol no admite esta acción';
          //console.log('mensaje error')
        }
        break
      case 'usuario-empleado':
        this.pedido.estadoPedido = this.cambioEstados.controls.estadoPedido.value;
        //console.log(this.pedido);
        this.pedidoService.updatePedido(this.pedido.id, this.pedido);
        this.mensajeOK = 'Estado del pedido registrado con éxito';
        break
    }
  }

  updateEstadoPago(){
    this.mensajeError = '';
    this.mensajeOK = '';
    let rol = this.usuario.rol;
    switch (rol) {
      case 'usuario-cadete':
        if(this.cambioEstados.controls.estadoPago.value=='pago recibido por cadete'){
          this.pedido.estadoPago = this.cambioEstados.controls.estadoPedido.value;
          //console.log(this.pedido);
          this.pedidoService.updatePedido(this.pedido.id, this.pedido)
          this.mensajeOK = 'Estado del pago registrado con éxito';
        } else {
          this.mensajeError = 'Su rol no admite esta acción';
          //console.log('mensaje error')
        }
        break
      case 'usuario-empleado':
        this.pedido.estadoPago = this.cambioEstados.controls.estadoPago.value;
        //console.log(this.pedido);
        this.pedidoService.updatePedido(this.pedido.id, this.pedido)
        this.mensajeOK = 'Estado del pago registrado con éxito';
        break
    }
  }

  goPrevPage(){
    this.router.navigate(['/bk-listado-pedidos-turno']);
  }
  
  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
