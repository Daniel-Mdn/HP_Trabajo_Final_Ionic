import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-reporte-ventas',
  templateUrl: './bk-reporte-ventas.page.html',
  styleUrls: ['./bk-reporte-ventas.page.scss'],
})
export class BkReporteVentasPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  goPrevPage(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
