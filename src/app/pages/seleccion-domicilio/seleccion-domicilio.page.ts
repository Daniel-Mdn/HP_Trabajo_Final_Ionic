import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-domicilios',
  templateUrl: './seleccion-domicilio.page.html',
  styleUrls: ['./seleccion-domicilio.page.scss'],
})
export class SeleccionDomicilioPage implements OnInit {
  usuario: string;
  listaDomicilios$: Observable<IDomicilio[]> = from([]);
  listaDomicilios: IDomicilio[] =[];
  domicilioActivated:boolean=false;
  constructor(
    private domicilioService: DomicilioService,
    private storage: StorageService,
    private route: Router
  ) {}

  async ngOnInit() {
    await this.storage.get('usuario').then((res) => (this.usuario = res));
    this.listaDomicilios$ = this.domicilioService.getDomicilios$;
    this.domicilioService
      .getDomiciliosId()
      .pipe(first()).subscribe((res) => {
        console.log('domicilios prueba')
        console.log(res)
      });
    this.domicilioService
      .getDomiciliosId({
        where: [{ name: 'idUsuario', validation: '==', value: this.usuario }]
      })
      .pipe(first()).subscribe((res) => {
        console.log('domicilios')
        console.log(res)
        this.domicilioService.setDomicilios$(res);
        this.listaDomicilios=res;
      });
  }

  formatDomicilio(domicilio: IDomicilio): string {
    let depto: string;
    if (domicilio.dpto && domicilio.piso) {
      depto = domicilio.piso + ' ' + domicilio.dpto;
    }
    return (
      domicilio.calle +
      ' ' +
      domicilio.nroCasa +
      ', ' +
      (depto ? depto + ', ' : '') +
      domicilio.idLocalidad
    );
  }

  selectPredeterminado(selectedDomicilio:IDomicilio){
    this.domicilioService.setCurrentDomicilio$(selectedDomicilio);
    this.route.navigate(['/inicio'])
    // this.listaDomicilios.forEach((dom)=>{
    //   if (dom.estaActivo && dom.id!=selectedDomicilio.id){
    //     dom.estaActivo=false;
    //     this.domicilioService.updateDomicilio(dom.id, dom)
    //   }
    //   if (dom.id==selectedDomicilio.id){
    //     dom.estaActivo=true;
    //     this.domicilioService.updateDomicilio(dom.id, dom)
    //   }
    // })
  }
}
