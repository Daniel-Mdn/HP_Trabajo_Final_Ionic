import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AlertController } from '@ionic/angular';
import { IDomicilio } from 'src/app/constants/interfaces';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-domicilios-registro',
  templateUrl: './domicilios-registro.page.html',
  styleUrls: ['./domicilios-registro.page.scss'],
})
export class DomiciliosRegistroPage implements OnInit {
  form:FormGroup;
  domicilio:IDomicilio;
  usuId:string;
  usuario:string;
  domiId:string;
  
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private domicilioService:DomicilioService,
    private alertController: AlertController,
    private storage: StorageService
  ) { 
    this.form = this.formBuilder.group({
      domiCalle:[''],
      domiNumero:[''],
      domiPiso:[''],
      domiDpto:[''],
      domiLoc:[''],
      domiProv:[''],
      domiObs:['']
      })
  }

  async ngOnInit() {
    await this.storage.get('usuario').then((res) => (this.usuario = res));
  }

  registraDomicilio(){
    this.storage.get('usuario').then((val)=>{ 
      this.usuId = val;
      console.log('usuId: ',this.usuId)
      var domi = {
        id: '',
        calle: this.form.controls.domiCalle.value,
        nroCasa: this.form.controls.domiNumero.value,
        piso: this.form.controls.domiPiso.value,
        dpto: this.form.controls.domiDpto.value,
        idLocalidad: 'rosario',
        idProvincia: 'santaFe',
        domiObs: this.form.controls.domiObs.value,
        idUsuario: this.usuId,
        estaActivo: true
      };
      this.domicilioService.createDomicilio(domi)
      this.domicilioService.getDomiciliosId({
        where: [{ name: 'idUsuario', validation: '==', value: this.usuario }]
      }).pipe(first()).subscribe((doms)=>{
        this.domicilioService.setDomicilios$(doms)})
      //this.router.navigate(['/domicilios']);
    })
  }

  redirectSeleccionDomicilio(){
    this.router.navigate(['/domicilios']);
  }

}
