import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-menu-productos',
  templateUrl: './bk-menu-productos.page.html',
  styleUrls: ['./bk-menu-productos.page.scss'],
})
export class BkMenuProductosPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectProdRegistro(){
    this.router.navigate(['/bk-producto-registra']);
  }

  redirectProdEdita(){
    this.router.navigate(['/bk-producto-lista']);
  }

  goPrevPage(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
