import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-menu-usuarios-emp',
  templateUrl: './bk-menu-usuarios-emp.page.html',
  styleUrls: ['./bk-menu-usuarios-emp.page.scss'],
})
export class BkMenuUsuariosEmpPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectUsuRegistro(){
    this.router.navigate(['/bk-usuario-emp-registro']);
  }

  redirectUsuEdita(){
    this.router.navigate(['/bk-usuario-emp-edita']);
  }

  goPrevPage(){
    this.router.navigate(['/bk-menu-empleado']);
  }

}
