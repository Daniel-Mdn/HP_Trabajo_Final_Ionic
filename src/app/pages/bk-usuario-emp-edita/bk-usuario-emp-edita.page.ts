import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/constants/interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, updatePassword } from 'firebase/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { Roles } from 'src/app/constants/constants';

@Component({
  selector: 'app-bk-usuario-emp-edita',
  templateUrl: './bk-usuario-emp-edita.page.html',
  styleUrls: ['./bk-usuario-emp-edita.page.scss'],
})
export class BkUsuarioEmpEditaPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form: FormGroup;
  formPass: FormGroup;
  usuario: IUsuario;
  usuId: '';
  role: '';
  myDate: Date;
  roles: Roles[] = Object.values(Roles);
  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      apellido: [null, Validators.required],
      nombre: [null, Validators.required],
      fechaNac: [null],
      nroTelefono: [null],
      rol: [null],
    });
    this.formPass = this.formBuilder.group({
      newPass: [null, Validators.required],
    });
  }

  async ngOnInit() {
    //console.log(this.storage.get('rol'));
    //console.log(this.storage.get('usuario'));
    this.route.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.usuId = id;
        this.usuarioService.getUser(id).subscribe((usu) => {
          //console.log(usu);
          this.usuario = usu;
          this.form.reset({
            apellido: usu.apellido,
            nombre: usu.nombre,
            fechaNac: new Date(usu.fechaNac).toISOString(),
            nroTelefono: usu.nroTelefono,
            rol: { value: usu.rol, disabled: true },
          });
        });
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Confirma que desea actualizar sus datos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            //this.handlerMessage = 'Alert confirmed';

            this.usuarioService.updateUser(this.usuId, this.form.value);
            //console.log(this.usuario)
            this.usuarioService.getUsersId({
              where: [
                {
                  name: 'rol',
                  validation: 'in',
                  value: [Roles.usuarioCadete, Roles.usuarioEmpleado],
                },
              ],
            }).subscribe((lista)=>this.usuarioService.setUsuarios$(lista));
            this.router.navigate(['/bk-menu-usuarios-emp']);
          },
        },
      ],
    });

    await alert.present();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  editaPass() {
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = this.formPass.controls.newPass.value;
    updatePassword(user, newPassword)
      .then(() => {
        console.log('Contraseña actualizada');
        this.modal.dismiss(null, 'cancel');
      })
      .catch((error) => {
        console.log('Error' + error);
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  submit() {
    if (this.form.value) {
      this.presentAlert();
    }
  }

  redirectInicio() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectMenuUsu() {
    this.router.navigate(['/bk-menu-usuarios-emp']);
  }
}
