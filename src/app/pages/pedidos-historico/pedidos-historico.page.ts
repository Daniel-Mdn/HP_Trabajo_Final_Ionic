import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos-historico',
  templateUrl: './pedidos-historico.page.html',
  styleUrls: ['./pedidos-historico.page.scss'],
})
export class PedidosHistoricoPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) { }

  ngOnInit() {
  }

  redirectDetallePedido(){
    this.router.navigate(['/detalle-pedido']);
  }
}
