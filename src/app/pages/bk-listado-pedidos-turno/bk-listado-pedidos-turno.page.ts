import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-listado-pedidos-turno',
  templateUrl: './bk-listado-pedidos-turno.page.html',
  styleUrls: ['./bk-listado-pedidos-turno.page.scss'],
})
export class BkListadoPedidosTurnoPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goPrevPage(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
