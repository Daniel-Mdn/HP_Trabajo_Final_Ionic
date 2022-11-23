import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';
import { ProvinciaService } from 'src/app/services/provincia/provincia.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-domicilios-editar',
  templateUrl: './domicilios-editar.page.html',
  styleUrls: ['./domicilios-editar.page.scss'],
})
export class DomiciliosEditarPage implements OnInit {
  domicilio: IDomicilio;
  usuId: string;
  usuario: string;
  listDomicilios: IDomicilio[];
  form: FormGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    calle: new FormControl(null, Validators.required),
    nroCasa: new FormControl(null, Validators.required),
    piso: new FormControl(null, []),
    dpto: new FormControl(null, []),
    domiObs: new FormControl(null, []),
    idLocalidad: new FormControl(
      { value: null, disabled: true },
      Validators.required
    ),
    idProvincia: new FormControl(
      { value: null, disabled: true },
      Validators.required
    ),
  });
  constructor(
    private router: Router,
    private domicilioService: DomicilioService,
    private localidadService: LocalidadService,
    private provinciaService: ProvinciaService,
    private alertController: AlertController,
    private storage: StorageService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.domicilioService.getDomicilio(id).subscribe((d) => {
        this.localidadService.getLocalidad(d.idLocalidad).subscribe((loc) => {
          this.provinciaService
            .getProvincia(loc.idProvincia)
            .subscribe((prov) => {
              this.domicilio = d;
              this.form.reset({
                id: id,
                idLocalidad: d.idLocalidad,
                calle: d.calle,
                nroCasa: d.nroCasa,
                piso: d.piso,
                dpto: d.dpto,
                domiObs: d.domiObs,
                idProvincia: prov?.descProv,
              });
            });
        });
      });
    });
  }
  async ngOnInit() {
    await this.storage.get('usuario').then((res) => (this.usuario = res));
    this.domicilioService
      .getDomiciliosId({
        where: [{ name: 'idUsuario', validation: '==', value: this.usuario }],
      })
      .subscribe((doms) => {
        this.listDomicilios = doms;

        console.log('ngOnInit', this.listDomicilios)
      });
  }

  async presentAlert() {
    console.log('fnpresentAlert');
    const alert = await this.alertController.create({
      header: '¿Confirma que desea actualizar sus datos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
            console.log('alerta cancelada');
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.storage.get('usuario').then((val) => {
              this.usuId = val;
              console.log('alerta confirmada');
              console.log('usuId: ', this.usuId);
              console.log(this.form.controls.id.value);
              var domiActualizado = {
                id: this.form.controls.id.value,
                calle: this.form.controls.calle.value,
                nroCasa: this.form.controls.nroCasa.value,
                piso: this.form.controls.piso.value,
                dpto: this.form.controls.dpto.value,
                idLocalidad: this.form.controls.idLocalidad.value,
                domiObs: this.form.controls.domiObs.value,
                idUsuario: this.usuId,
                estaActivo: true,
              } as IDomicilio;
              let DomicilioActualizado = this.domicilioService.updateDomicilio(
                domiActualizado.id,
                domiActualizado
              );

              DomicilioActualizado.pipe(first()).subscribe((domActualizado) => {
                let index = this.listDomicilios.findIndex(
                  (i) => i.id == domActualizado.id
                );
                this.listDomicilios[index] = domActualizado;
                if (domActualizado.estaActivo==true){
                  this.domicilioService.setCurrentDomicilio$(domActualizado)
                }
                this.domicilioService.setDomicilios$(this.listDomicilios)
              });
              this.router.navigate(['/domicilios']);
            });
          },
        },
      ],
    });

    await alert.present();
  }

  redirectDomicilios() {
    this.router.navigate(['/domicilios']);
  }
}
