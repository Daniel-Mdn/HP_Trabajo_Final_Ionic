import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private menu: MenuController, private router: Router) { }
  @Input() prevPage:string="inicio";

  ngOnInit() {}

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  redirectPedidos(){
    this.router.navigate(['/pedidos-historico']);
  }
  redirectUsuario(){

  }
  redirectDomicilios(){
    this.router.navigate(['/domicilios']);
  }
  logout(){

  }

  goPrevPage(){
    this.router.navigate(['/'+this.prevPage]);
  }
}
