import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IExtras, IHistorialExtras } from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { first, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ExtrasService } from 'src/app/services/extras/extras.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bk-adicional-edita',
  templateUrl: './bk-adicional-edita.page.html',
  styleUrls: ['./bk-adicional-edita.page.scss'],
})
export class BkAdicionalEditaPage implements OnInit {
  form: FormGroup;
  extra: IExtras;
  extras: IExtras[];
  extras$: Observable<IExtras[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageService,
    private alertController: AlertController,
    private extrasService: ExtrasService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      idAdic: [{ value: '', disabled: true }, Validators.required],
      descAdic: ['', Validators.required],
      precioAdic: ['', Validators.required],
    });
  }

  adicId: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.adicId=params.id
        this.extras$ = this.extrasService.getExtras$;
        this.extras$.subscribe((extras) => (this.extras = extras));
        this.extrasService.getExtra(this.adicId).subscribe((a) => {
          console.log(a);
          this.extra = a;
          const hist = this.firestore.doc(a.histPath);
          a.historial_extra = [];
          hist
            .collection<IHistorialExtras>('historial_extras', (ref) =>
              ref.orderBy('fechaDesde', 'desc')
            )
            .valueChanges()
            .pipe(first())
            .subscribe((x) => {
              a.historial_extra.push(x[0]);
              a.precio = x[0]?.precioExtra ?? 0;
              this.form.reset({
                idAdic: this.adicId,
                descAdic: this.extra.descExtra,
                precioAdic: this.extra.precio,
              });
            });
        });
      }
    });
  }

  // async presentAlert() {
  //   console.log('fnpresentAlert');
  //   const alert = await this.alertController.create({
  //     header: '¿Confirma que desea actualizar sus datos?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'cancel',
  //         handler: () => {
  //           //this.handlerMessage = 'Alert canceled';
  //           console.log('alerta cancelada');
  //         },
  //       },
  //       {
  //         text: 'Sí',
  //         role: 'confirm',
  //         handler: () => {
  //           //this.handlerMessage = 'Alert confirmed';
  //           console.log('alerta confirmada');
  //           let adicActualizado:IExtras = {
  //             descExtra: this.form.controls.descAdic.value,
  //           };
  //           this.extrasService.updateExtra(this.adicId, adicActualizado).subscribe((id))
  //           this.router.navigate(['/bk-menu-productos']);
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  goPrevPage() {
    this.router.navigate(['/bk-adicional-edita']);
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectMenuUsu() {
    this.router.navigate(['/bk-menu-productos']);
  }

  submit() {
    if (this.form.valid) {
      let extra: IExtras = {
        descExtra: this.form.get('descAdic').value,
      };
      const precio=this.extra.precio
      this.extrasService
      .updateExtra(this.adicId, extra)
      .pipe(first())
      .subscribe((e) => {
          const histCollection = this.firestore.collection(
            e.histPath + '/' + 'historial_extras'
          );
          if (precio!= Number(this.form.get('precioAdic').value)) {
            histCollection.add({
              precioExtra: this.form.get('precioAdic').value,
              fechaDesde: new Date(),
            });
          }
          this.extras.forEach((item) => {
            if (item.id == this.adicId) {
              item = extra;
            }
          });
          this.extrasService.setExtras$(this.extras);
          this.router.navigate(['/bk-menu-productos']);
        });
    }
  }
}

/* PRUEBAS PARA SACAR EL ÚLTIMO PRECIO QUE NO FUNCIONARON
  ultPrecio:number;
  const hist = this.firestore.doc(p.histPath);
  hist
    .collection<IHistorialPrecio>('historial_precio', (ref) =>
      ref.orderBy('fechaDesde', 'desc')
    )
    .valueChanges()
    .pipe(first())
    .subscribe((x) => {
      p.historial_precio = [x[0]];
      p.precio = x[0]?.precioProd ?? 0;
      // this.totalProducto = this.producto.precio;
    });
  

  async ngOnInit() {
    this.adicId = 'prueba'; //valor harcodeado para probar funcionalidad. El valor tiene que venir del producto que seleccione en producto-lista
    console.log(this.adicId);
    await this.firestore.collection('extras').doc('prueba').collection<IHistorialExtras>('historial_precio', (ref) =>
      ref.orderBy('fechaDesde', 'desc')
    )
    .valueChanges()
    .pipe(first())
    .subscribe((x) => {
      this.ultPrecio = x[0].precioExtra;
    })
    
    
    await this.firestore.doc('extras/prueba').collection<IHistorialExtras>('historial_precio', (ref) =>
      ref.orderBy('fechaDesde', 'desc')
    )
    .valueChanges()
    //.pipe()
    .subscribe((x) => {
       //= [x[0]];
       this.ultPrecio = x[0]?.precioExtra ?? 0;
      // this.totalProducto = this.producto.precio;
    });
    
    console.log('ultPrecio = '+this.ultPrecio)

  //  this.storage.get('productoSeleccionado').then((prod)=>{
  //  this.prodId = prod.id;
*/
