import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import {
  TamaniosSelectHamb,
  TamaniosSelectPizza,
  Categorias,
} from 'src/app/constants/constants';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Observable, of } from 'rxjs';
import { ICategoria } from 'src/app/constants/interfaces';
import { Camera } from '@capacitor/camera';
import {
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera/dist/esm/definitions';
import { Filesystem } from '@capacitor/filesystem';
import { Directory } from '@capacitor/filesystem/dist/esm/definitions';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-bk-producto-registra',
  templateUrl: './bk-producto-registra.page.html',
  styleUrls: ['./bk-producto-registra.page.scss'],
})
export class BkProductoRegistraPage implements OnInit {
  form: FormGroup;
  constructor(
    private firestore: AngularFirestore,
    private storageFire: AngularFireStorage,
    private plt: Platform,
    private productoService: ProductoService,
    private categoriasService: CategoriesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      descProd: ['', Validators.required],
      tamanio: [{ value: '', disabled: true }, Validators.required],
      costoProd: [null, Validators.required],
      precioProd: [null, Validators.required],
      margen: [null, Validators.required],
      imagen: [null],
    });
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }
  TamaniosHamb: TamaniosSelectHamb[] = Object.values(TamaniosSelectHamb);
  TamaniosPizza: TamaniosSelectPizza[] = Object.values(TamaniosSelectPizza);
  tamanios: any[] = [];
  categorias$: Observable<ICategoria[]> = of();
  categorias: ICategoria[];
  uploadURL: Observable<string>;

  ngOnInit() {
    this.categorias$ = this.categoriasService.getCategories$;
    this.categoriasService.getCategoriesId().subscribe((cats) => {
      this.categorias = cats;
      this.categoriasService.setCategories$(cats);
    });
  }

  async registrarProducto() {
    if (this.form.valid) {
      const today = new Date();
      let prodId = '';
      let nombre = this.form.controls.nombre.value;
      let dataProducto = {
        idCategoria: this.form.controls.categoria.value,
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
        descProd: this.form.controls.descProd.value,
        tamanio: this.form.controls.tamanio.value,
        disponibilidad: true,
        baja: false,
        imagen: this.form.controls.imagen.value,
      };
      if (this.form.controls.imagen.value != null) {
        await this.uploadImage(this.form.controls.imagen.value).then(
          (res) => (dataProducto.imagen = res)
        );
      }
      let precioProducto = {
        fechaDesde: today,
        costoProd: Number(this.form.controls.costoProd.value),
        precioProd: Number(this.form.controls.precioProd.value),
        margen: Number(this.form.controls.margen.value),
      };
      this.productoService.createProduct(dataProducto).then((id) => {
        prodId = id;
        this.firestore
          .collection('productos')
          .doc(prodId)
          .collection('historial_precio')
          .add(precioProducto);
        this.router.navigate(['/bk-menu-productos']);
      });
    }
  }
  goPrevPage() {
    this.router.navigate(['/bk-menu-productos']);
  }
  url: string = null;

  setTamanios(e) {
    let categoria = this.categorias.find((cat) => cat.id == e.detail.value);
    if (categoria) {
      this.form.get('tamanio').enable();
    }
    if (categoria.id == Categorias.Hamburguesas) {
      this.tamanios = this.TamaniosHamb;
    } else {
      if (
        categoria.id == Categorias.PizzasMolde ||
        categoria.id == Categorias.PizzasParrilla
      ) {
        this.tamanios = this.TamaniosPizza;
      } else {
        this.tamanios = [];
      }
    }
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      var blob = dataURLtoBlob(image.dataUrl);
      this.form.controls.imagen.setValue(blob);
      this.getImage()
    }
  }

  async uploadImage(blob: Blob): Promise<string> {
    const nombreFoto =
      this.form.controls.nombre.value != ''
        ? this.form.controls.nombre.value
        : Math.floor(Math.random() * 1000).toString();
    let filePath = '';
    if (this.form.controls.categoria.value == Categorias.Hamburguesas) {
      filePath = 'Hamburguesas/' + nombreFoto;
    } else {
      if (
        this.form.controls.categoria.value == Categorias.PizzasParrilla ||
        this.form.controls.categoria.value == Categorias.PizzasMolde
      ) {
        filePath = 'Pizzas/' + nombreFoto;
      } else {
        filePath = 'sinCategoria/' + nombreFoto;
      }
    }
    let path = '';
    await this.storageFire.storage
      .ref(filePath)
      .put(blob)
      .then(function (snapshot) {
        path = snapshot.ref.fullPath;
      });
    let imagePath = '';
    await this.storageFire.storage
      .ref(path)
      .getDownloadURL()
      .then((res) => (imagePath = res));
    return imagePath;
  }

  getImage() {
    let image = this.form.controls.imagen.value as Blob;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.url = reader.result.toString();
    };
  }
}
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
