import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IExtras, IHistorialExtras } from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { first, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ExtrasService } from 'src/app/services/extras/extras.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-bk-adicional-edita',
  templateUrl: './bk-adicional-edita.page.html',
  styleUrls: ['./bk-adicional-edita.page.scss'],
})
export class BkAdicionalEditaPage implements OnInit {
  form:FormGroup;
  adicional:IExtras;
  
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private storage:StorageService,
    private alertController: AlertController,
    private extrasService:ExtrasService,
    public firestore: AngularFirestore
  ) {
    this.form = this.formBuilder.group({
      idAdic: [{value: '', disabled: true}],
      descAdic:[''],
      precioAdic: ['', Validators.required],
    })
  }

  adicId:string;


  ngOnInit() {
    this.adicId = 'prueba'; //valor harcodeado para probar funcionalidad. El valor tiene que venir del producto que seleccione en producto-lista
    console.log(this.adicId);    
      this.extrasService.getExtra(this.adicId).subscribe((a)=>{
        this.adicional = a;
        this.form.controls.idAdic.setValue(this.adicId);
        this.form.controls.descAdic.setValue(this.adicional.descExtra);
        //this.form.controls.precioProd.setValue(this.producto.historial_precio[0].precioProd);
        // FALTA ESTA PARTE DE TRAER EL PRECIO
      })
    //  }
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
              //this.handlerMessage = 'Alert confirmed';
              console.log('alerta confirmada')
              var adicActualizado = {
                descExtra: this.form.controls.descAdic.value,
                //precioProd: 
                // FALTA ACTUALIZAR PRECIO
              };
              //this.productService.updateProduct(this.prodId, prodActualizado)
              this.router.navigate(['/bk-menu-productos']);
            }
          }
        ]
      })

      await alert.present();
    }

    goPrevPage(){
      this.router.navigate(['/bk-adicional-edita']);
    }

    redirectHome(){
      this.router.navigate(['/bk-menu-empleado']);
    }

    redirectMenuUsu(){
      this.router.navigate(['/bk-menu-productos']);
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