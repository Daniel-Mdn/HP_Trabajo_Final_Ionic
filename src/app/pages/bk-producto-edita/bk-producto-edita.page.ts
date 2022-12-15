import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICategoria,
  IHistorialPrecio,
  IProducto,
} from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { first, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Observable } from 'rxjs';
import {
  Categorias,
  CategoriasSelect,
  TamaniosHamburguesa,
  TamaniosSelect,
  TamaniosSelectHamb,
  TamaniosSelectPizza,
} from 'src/app/constants/constants';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bk-producto-edita',
  templateUrl: './bk-producto-edita.page.html',
  styleUrls: ['./bk-producto-edita.page.scss'],
})
export class BkProductoEditaPage implements OnInit {
  form: FormGroup;
  producto: IProducto;
  productos: IProducto[];
  productos$: Observable<IProducto[]>;
  categorias$: Observable<ICategoria[]>;
  tamanios: string[] = Object.values(TamaniosSelect);
  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router,
    private storage: StorageService,
    private productService: ProductoService,
    private categoriasService: CategoriesService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      prodId: [{ value: null, disabled: true }],
      idCategoria: [null, Validators.required],
      tamanio: [null, Validators.required],
      nombre: [null, Validators.required],
      descProd: [null, Validators.required],
      disponibilidad: [null],
      imagen: [{ value: null, disabled: true }],
      costoProd: [null],
      margen: [null],
      precioProd: [null, Validators.required],
    });
  }

  prodId: string;

  ngOnInit() {
    //  this.storage.get('productoSeleccionado').then((prod)=>{
    //  this.prodId = prod.id;
    //this.prodId = 'yfJiHKH3UUknM6pr6J7D'; //valor harcodeado para probar funcionalidad. El valor tiene que venir del producto que seleccione en producto-lista
    this.categorias$ = this.categoriasService.getCategories$;
    this.productos$ = this.productService.getProducts$;
    this.productos$.subscribe((prods) => (this.productos = prods));
    this.categoriasService
      .getCategoriesId()
      .subscribe((res) => this.categoriasService.setCategories$(res));
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.prodId = params.id;
        console.log(this.prodId);
        this.productService.getProduct(this.prodId).subscribe((p) => {
          this.producto = p;
          console.log(p);
          p.historial_precio = [];
          const hist = this.firestore.doc(p.histPath);
          hist
            .collection<IHistorialPrecio>('historial_precio', (ref) =>
              ref.orderBy('fechaDesde', 'desc')
            )
            .valueChanges()
            .pipe(first())
            .subscribe((x) => {
              p.historial_precio.push({ tamanio: p.tamanio, ...x[0] });
              p.precio = x[0]?.precioProd ?? 0;
              // this.totalProducto = this.producto.precio;
              this.form.reset({
                prodId: this.prodId,
                idCategoria: this.producto.idCategoria,
                tamanio: this.producto.tamanio,
                nombre: this.producto.nombre,
                descProd: this.producto.descProd,
                disponibilidad: this.producto.disponibilidad,
                imagen: this.producto.imagen,
                precioProd: this.producto.precio,
              });
            });
        });
      }
    });
    //  }
    this.form.get('idCategoria').valueChanges.subscribe((val) => {
      let tamaniosHamb = Object.values(TamaniosSelectHamb);
      let tamaniosPizza = Object.values(TamaniosSelectPizza);
      this.form.get('tamanio').reset(null);
      if (CategoriasSelect.Hamburguesas == val) {
        this.tamanios = tamaniosHamb;
      } else {
        if (
          CategoriasSelect.PizzasMolde == val ||
          CategoriasSelect.PizzasParrilla == val
        )
          this.tamanios = tamaniosPizza;
      }
    });
  }
  getControl(control: string) {
    return this.form.get(control) as FormControl;
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
            //this.handlerMessage = 'Alert confirmed';
            console.log('alerta confirmada');
            var prodActualizado = {
              nombre: this.form.controls.nombre.value,
              descProd: this.form.controls.descProd.value,
              disponibilidad: this.form.controls.disponibilidad.value,
              imagen: this.form.controls.imagen.value,
              //precioProd:
            };
            //this.productService.updateProduct(this.prodId, prodActualizado)
            this.router.navigate(['/bk-menu-productos']);
          },
        },
      ],
    });

    await alert.present();
  }

  goPrevPage() {
    this.router.navigate(['/bk-menu-productos']);
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectMenuProdLista() {
    this.router.navigate(['/bk-producto-lista']);
  }

  submit() {
    if (this.form.valid) {
      let producto: IProducto = {
        baja: false,
        descProd: this.form.get('descProd').value,
        idCategoria: this.form.get('idCategoria').value,
        disponibilidad: this.form.get('disponibilidad').value,
        imagen: this.form.get('imagen').value,
        nombre: this.form.get('nombre').value,
        tamanio: this.form.get('tamanio').value,
      };

      console.log(producto);

      this.productService
        .updateProduct(this.prodId, producto)
        .pipe(first())
        .subscribe((prod) => {
          const histCollection = this.firestore.collection(
            prod.histPath + '/' + 'historial_precio'
          );
          if (
            this.producto.precio != Number(this.getControl('precioProd').value)
          ) {
            histCollection.add({
              precioProd: this.form.get('precioProd').value,
              fechaDesde: new Date(),
            });
          }
          this.productos.forEach((item) => {
            if (item.id == this.prodId) {
              item = prod;
            }
          });
          this.productService.setProducts$(this.productos);
          this.router.navigate(['/bk-menu-productos']);
        });
    }
  }
}
