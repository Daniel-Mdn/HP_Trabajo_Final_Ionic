import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { IDomicilio, IUsuario } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-bk-usuario-emp-registro',
  templateUrl: './bk-usuario-emp-registro.page.html',
  styleUrls: ['./bk-usuario-emp-registro.page.scss'],
})
export class BkUsuarioEmpRegistroPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form: FormGroup;
  formAuth: FormGroup;
  errorControls: any;
  handlerMessage?: boolean;
  usuarios: IUsuario[];
  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private domicilioService: DomicilioService,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      apellido: [null, Validators.required],
      nombre: [null, Validators.required],
      fechaNac: [null, Validators.required],
      nroTel: [null, Validators.required],
      domiCalle: [null, Validators.required],
      domiNro: [null, Validators.required],
      domiPiso: [null],
      domiDpto: [null],
      domiObs: [null],
      domiProv: [null, Validators.required],
      domiLoc: [null, Validators.required],
      rol: [null, Validators.required],
    });
    this.formAuth = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      repeatPassword: [null, Validators.required],
    });
    this.errorControls = this.form.controls;
  }
  isOpen = true;
  isSubmittedFormAuth = false;
  ngOnInit() {
    this.usuarioService.getUsersId().subscribe((res) => {
      this.usuarios = res;
    });
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectMenu() {
    this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/bk-menu-usuarios-emp']);
    this.isOpen = true;
    this.isSubmittedFormAuth = false;
  }

  confirmarEmail() {
    this.isSubmittedFormAuth = true;
    if (this.formAuth.valid && this.contrasIguales()) {
      this.isOpen = false;
    }
  }
  async registrarEmail(): Promise<any> {
    let email = this.formAuth.controls.email.value;
    let password = this.formAuth.controls.password.value;
    let response;
    let resp;
    await this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        response = userCredential;
        resp = 'user';
      })
      .catch((error: FirebaseError) => {
        response = error;
        resp = 'error';
      });
    this.usuarios;
    return { response, resp };
  }

  async registroUsuEmp() {
    if (this.formAuth.valid && this.form.valid) {
      let email = this.formAuth.controls.email.value;
      let dataUsu: IUsuario = {
        apellido: this.form.controls.apellido.value,
        nombre: this.form.controls.nombre.value,
        fechaNac: this.form.controls.fechaNac.value,
        nroTelefono: this.form.controls.nroTel.value,
        rol: this.form.controls.rol.value,
      };
      var dataDomi: IDomicilio = {
        idUsuario: email,
        calle: this.form.controls.domiCalle.value,
        nroCasa: this.form.controls.domiNro.value,
        piso: this.form.controls.domiPiso.value,
        dpto: this.form.controls.domiDpto.value,
        domiObs: this.form.controls.domiObs.value,
        idLocalidad: this.form.controls.domiLoc.value,
        idProvincia: this.form.controls.domiProv.value,
      };
      try {

        let response = await this.registrarEmail();
        // this.firestore.collection('usuarios').doc(email).set(dataUsu);
        if (response.resp == 'error') {
          const resp = response.response as FirebaseError;
          throw resp;
        }
        if (
          this.usuarios.find((usuario) => (usuario.id == email)) != undefined
        ) {
          this.errorAlert();
        } else {
          this.usuarioService
            .createUserWithId(email, dataUsu)
            .then(() => {})
            .catch((error) => {
              throw error;
            });
          this.domicilioService.createDomicilio(dataDomi);
          // this.firestore.collection('domicilios').doc().set(dataDomi);
          this.form.reset();
          this.formAuth.reset();
          this.router.navigate(['/bk-menu-usuarios-emp']);
          await this.sucessAlert()
        }
      } catch (error) {
        this.errorAlert();
      }
    }
  }

  contrasIguales() {
    if (
      this.formAuth.controls.password.value ==
      this.formAuth.controls.repeatPassword.value
    ) {
      if (this.formAuth.controls.repeatPassword.errors?.required != undefined) {
        this.formAuth.controls.repeatPassword.setErrors(
          this.formAuth.controls.repeatPassword.errors.required
        );
      } else {
        this.formAuth.controls.repeatPassword.setErrors(null);
      }
      return true;
    } else {
      if (this.formAuth.controls.repeatPassword.errors?.required != undefined) {
        this.formAuth.controls.repeatPassword.setErrors({
          ...this.formAuth.controls.repeatPassword.errors,
          different: true,
        });
      } else {
        this.formAuth.controls.repeatPassword.setErrors({ different: true });
      }
      return false;
    }
  }

  async cancelAlert() {
    const alert = await this.alertController.create({
      header: 'Seguro que desea salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = false;
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = true;
            this.form.reset();
            this.formAuth.reset();
            this.router.navigate(['/bk-menu-usuarios-emp']);
          },
        },
      ],
    });

    await alert.present();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  async errorAlert(message?: string) {
    const alert = await this.alertController.create({
      header: message ? message : 'El usuario que desear registrar ya existe',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {},
        },
      ],
    });

    await alert.present();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }
  async sucessAlert() {
    const alert = await this.alertController.create({
      header: 'El usuario fue creado existosamente',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.isOpen = true;
            this.isSubmittedFormAuth = false;
          },
        },
      ],
    });

    await alert.present();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }
}
