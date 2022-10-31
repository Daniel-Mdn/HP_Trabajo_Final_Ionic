import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-pedido-estado',
  templateUrl: './bk-pedido-estado.page.html',
  styleUrls: ['./bk-pedido-estado.page.scss'],
})
export class BkPedidoEstadoPage implements OnInit {

  constructor(
    private router: Router
  ) {
   }

  ngOnInit() {
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
