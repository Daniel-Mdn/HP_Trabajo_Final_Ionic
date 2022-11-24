import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-usuario-lista',
  templateUrl: './bk-usuario-lista.page.html',
  styleUrls: ['./bk-usuario-lista.page.scss'],
})
export class BkUsuarioListaPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  goPrevPage(){
    this.router.navigate(['/bk-menu-usuarios-emp']);
  }

  redirectUsuarioEdita(id:string){
    this.router.navigate(['/bk-menu-usuario-emp-edita']);
  }
}
