import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, merge, Observable, of, pipe } from 'rxjs';
import { Roles } from 'src/app/constants/constants';
import { IUsuario } from 'src/app/constants/interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-bk-usuario-lista',
  templateUrl: './bk-usuario-lista.page.html',
  styleUrls: ['./bk-usuario-lista.page.scss'],
})
export class BkUsuarioListaPage implements OnInit {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  listaUsuarios$: Observable<IUsuario[]> = of();

  ngOnInit() {
    this.listaUsuarios$ = this.usuarioService.getUsuarios$;
    this.usuarioService
      .getUsersId({
        where: [
          {
            name: 'rol',
            validation: 'in',
            value: [Roles.usuarioCadete, Roles.usuarioEmpleado],
          },
        ],
      })
      .subscribe((usuarios) => this.usuarioService.setUsuarios$(usuarios));
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  goPrevPage() {
    this.router.navigate(['/bk-menu-usuarios-emp']);
  }

  redirectUsuarioEdita(id: string) {
    this.router.navigate(['/bk-usuario-emp-edita', id]);
  }
}
