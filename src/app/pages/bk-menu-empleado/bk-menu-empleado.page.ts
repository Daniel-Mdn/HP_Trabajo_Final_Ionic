import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-menu-empleado',
  templateUrl: './bk-menu-empleado.page.html',
  styleUrls: ['./bk-menu-empleado.page.scss'],
})
export class BkMenuEmpleadoPage implements OnInit {
  

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectPedidosTurno(){
    this.router.navigate(['/bk-listado-pedidos-turno']);
  }

  redirectReporteVentas(){
    this.router.navigate(['/bk-reporte-ventas']);
  }

  redirectMenuUsuarios(){
    this.router.navigate(['/bk-usuario-lista']);
  }

  redirectMenuProductos(){
    this.router.navigate(['/bk-menu-productos']);
  }

  logout(){}

}
