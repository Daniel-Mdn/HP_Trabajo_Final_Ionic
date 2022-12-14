import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updatePassword } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private menu: MenuController,
    private router: Router,
    private domicilioService: DomicilioService,
    private storage: StorageService,
    private usuarioService:UsuarioService,
    private angularFireAuth: AngularFireAuth,


  ) {}
  @Input() prevPage: string = 'inicio';
  @Input() showMenu: boolean = true;
  @Input() showBack: boolean = true;
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentDomicilio$: Observable<IDomicilio> = of();
  currentDomicilio: IDomicilio;
  userDomicilios: Observable<IDomicilio[]> = from([]);
  currentUrl:string;
  currentUser:string;
  async ngOnInit() {
    this.currentUrl=this.router.url;
    console.log('currentUrl', this.currentUrl)
    this.currentDomicilio$ = this.domicilioService.getCurrentDomicilio$;
    this.currentDomicilio$.subscribe((dom) => {
      if (Object.entries(dom).length !== 0) {
        this.currentDomicilio = dom;
      }
    });
  }

  openCustom() {
    this.storage.get('usuario').then((val)=>{
      this.usuarioService.getUser(val).subscribe((usu)=>{      
        console.log(usu);
        this.currentUser = usu.nombre;
      })
    })
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  
  redirectPedidos() {
    this.router.navigate(['/pedidos-historico']);
  }

  redirectUsuario() {
    this.router.navigate(['/usuario-cli-edita']);
  }

  redirectDomicilios() {
    this.router.navigate(['/domicilios']);
  }

  logout() {
    this.storage.remove('usuario').then((res) => console.log);
    const auth = getAuth()
    signOut(auth).then(() => {
        console.log('Sign-out successful')
      }).catch((error) => {
        console.log('Error en sign-out')
      });
    this.router.navigate(['/login']);
  }

  goPrevPage() {
    this.back.emit(true);
    this.router.navigate(['/' + this.prevPage]);
  }

  formatDomicilio(): string {
    let depto: string;
    if (this.currentDomicilio.dpto && this.currentDomicilio.piso) {
      depto = this.currentDomicilio.piso + ' ' + this.currentDomicilio.dpto;
    }
    return (
      this.currentDomicilio.calle +
      ' ' +
      this.currentDomicilio.nroCasa +
      ', ' +
      (depto ? depto + ', ' : '') +
      this.currentDomicilio.idLocalidad
    );
  }
}
