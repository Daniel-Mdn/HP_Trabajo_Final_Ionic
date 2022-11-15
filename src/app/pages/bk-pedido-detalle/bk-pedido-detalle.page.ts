import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-pedido-detalle',
  templateUrl: './bk-pedido-detalle.page.html',
  styleUrls: ['./bk-pedido-detalle.page.scss'],
})
export class BkPedidoDetallePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goPrevPage(){
    this.router.navigate(['/bk-listado-pedidos-turno']);
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
