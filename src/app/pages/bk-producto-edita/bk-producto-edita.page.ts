import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { first, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bk-producto-edita',
  templateUrl: './bk-producto-edita.page.html',
  styleUrls: ['./bk-producto-edita.page.scss'],
})
export class BkProductoEditaPage implements OnInit {
  form:FormGroup;
  producto:IProducto;
  
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private storage:StorageService,
    private productService:ProductoService,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      prodId: [{value: '', disabled: true}],
      categoria:[{value: '', disabled: true}],
      tamanio: [{value: '', disabled: true}],
      nombre: ['', Validators.required],
      descProd: ['', Validators.required],
      disponibilidad: [{value: '', disabled: true}],
      nuevaDisp: [''],
      imagen: [''],
      costoProd: [''],
      margen: [''],
      precioProd: ['', Validators.required],
    })
  }

  prodId:string;

  ngOnInit() {
  //  this.storage.get('productoSeleccionado').then((prod)=>{
  //  this.prodId = prod.id;
    this.prodId = 'yfJiHKH3UUknM6pr6J7D';
    console.log(this.prodId);
    this.productService.getProduct(this.prodId).subscribe((p)=>{
      this.producto = p;
      this.form.controls.prodId.setValue(this.prodId);
      this.form.controls.categoria.setValue(this.producto.idCategoria);
      this.form.controls.tamanio.setValue(this.producto.tamanio);
      this.form.controls.nombre.setValue(this.producto.nombre);
      this.form.controls.descProd.setValue(this.producto.descProd);
      if (this.producto.disponibilidad){
        this.form.controls.disponibilidad.setValue('Activo');
      }else{
        this.form.controls.disponibilidad.setValue('Inactivo');
      }
      this.form.controls.imagen.setValue(this.producto.imagen);
      //this.form.controls.precioProd.setValue(this.producto.historial_precio[0].precioProd);
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
            var prodActualizado = {
              nombre: this.form.controls.nombre.value,
              descProd: this.form.controls.descProd.value,
              disponibilidad: this.form.controls.disponibilidad.value,
              imagen: this.form.controls.imagen.value,
              //precioProd: 
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
    this.router.navigate(['/bk-menu-productos']);
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }
}
