import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-domicilios-editar',
  templateUrl: './domicilios-editar.page.html',
  styleUrls: ['./domicilios-editar.page.scss'],
})
export class DomiciliosEditarPage implements OnInit {
  form:FormGroup;
  domicilio:IDomicilio;
  usuId:string;
  
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
    domiLoc:[{value: '', disabled: true}],
    domiProv:[{value: '', disabled: true}],
    domiObs:['']
    })
  }

  domiId:string;

  ngOnInit() {
    this.domiId = 'MsE3LRGov09eEP8369MP';
    this.domicilioService.getDomicilio(this.domiId).subscribe((d)=>{
      this.domicilio = d;
      this.form.controls.domiCalle.setValue(this.domicilio.calle);
      this.form.controls.domiNumero.setValue(this.domicilio.nroCasa);
      this.form.controls.domiPiso.setValue(this.domicilio.piso);
      this.form.controls.domiDpto.setValue(this.domicilio.dpto);
      this.form.controls.domiObs.setValue(this.domicilio.domiObs);
      this.form.controls.domiLoc.setValue('Rosario');
      this.form.controls.domiProv.setValue('Santa Fe');
  })
  }

  async presentAlert() {
    console.log('fnpresentAlert')
    const alert = await this.alertController.create({
      header: '¿Confirma que desea actualizar sus datos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
            console.log('alerta cancelada')
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.storage.get('usuario').then((val)=>{ 
              this.usuId = val;
              console.log('alerta confirmada')
              console.log('usuId: ',this.usuId)
              var domiActualizado = {
                id: this.domiId,
                calle: this.form.controls.domiCalle.value,
                nroCasa: this.form.controls.domiNumero.value,
                piso: this.form.controls.domiPiso.value,
                dpto: this.form.controls.domiDpto.value,
                idLocalidad: 'rosario',
                domiObs: this.form.controls.domiObs.value,
                idUsuario: this.usuId,
                estaActivo: true
              };
              this.domicilioService.updateDomicilio(this.domiId, domiActualizado)
              this.router.navigate(['/domicilios']);
          })
          }
        }
      ]
    })

    await alert.present();
  }

  redirectDomicilios(){
    this.router.navigate(['/domicilios']);
  }

}
