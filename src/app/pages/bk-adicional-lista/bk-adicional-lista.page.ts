import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-adicional-lista',
  templateUrl: './bk-adicional-lista.page.html',
  styleUrls: ['./bk-adicional-lista.page.scss'],
})
export class BkAdicionalListaPage implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }

  goPrevPage(){
    this.router.navigate(['/bk-menu-productos']);
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
