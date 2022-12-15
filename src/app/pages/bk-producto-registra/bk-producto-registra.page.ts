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
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      // this.saveImage(image);
      this.firestore
      console.log(image)
    }
  }

  async saveImage(photo: Photo) {
    console.log('photo', photo)
    
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    console.log(savedFile)
  }

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
