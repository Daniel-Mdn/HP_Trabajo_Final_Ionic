import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-domicilios',
  templateUrl: './domicilios.page.html',
  styleUrls: ['./domicilios.page.scss'],
})
export class DomiciliosPage implements OnInit {
  usuario: string;
  listaDomicilios$: Observable<IDomicilio[]> = from([]);
  listaDomicilios: IDomicilio[] = [];
  currentDomicilio: IDomicilio;
  domicilioActivated: boolean = false;
  constructor(
    private domicilioService: DomicilioService,
    private storage: StorageService,
    private route: Router
  ) {}

  async ngOnInit() {
    await this.storage.get('usuario').then((res) => (this.usuario = res));
    this.listaDomicilios$ = this.domicilioService.getDomicilios$;
    this.domicilioService
      .getDomiciliosId({
        where: [{ name: 'idUsuario', validation: '==', value: this.usuario }],
      })
      .pipe(first())
      .subscribe((res) => {
        this.domicilioService.setDomicilios$(res);
        this.listaDomicilios = res;
      });
    this.domicilioService.currentDomicilio$.subscribe(
      (dom) => (this.currentDomicilio = dom)
    );
  }

  editaDomicilio(id: string) {
    this.route.navigate(['/domicilios-editar', id]);
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

  redirectDomicilioRegistro() {
    this.route.navigate(['/domicilios-registro']);
  }

  selectPredeterminado(selectedDomicilio: IDomicilio) {
    this.domicilioService.setCurrentDomicilio$(selectedDomicilio);
    this.route.navigate(['/inicio']);
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

  estaCurrentDomicilio(){
    if(this.currentDomicilio && Object.entries(this.currentDomicilio).length>0){
      return true
    }else{
      return false
    }
  }
}
