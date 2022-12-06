import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-bk-menu-empleado',
  templateUrl: './bk-menu-empleado.page.html',
  styleUrls: ['./bk-menu-empleado.page.scss'],
})
export class BkMenuEmpleadoPage implements OnInit {
  

  constructor(
    private router: Router,
    private storage: StorageService
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
    this.router.navigate(['/bk-menu-usuarios-emp']);
  }

  redirectMenuProductos(){
    this.router.navigate(['/bk-menu-productos']);
  }

  logout(){
    this.storage.remove('usuario').then((res) => console.log);
    const auth = getAuth()
    signOut(auth).then(() => {
        console.log('Sign-out successful')
      }).catch((error) => {
        console.log('Error en sign-out')
      });
      this.router.navigate(['/login']);
  }

}
