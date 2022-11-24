import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/constants/interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { AlertController, IonModal } from '@ionic/angular';


@Component({
  selector: 'app-usuario-cli-edita',
  templateUrl: './usuario-cli-edita.page.html',
  styleUrls: ['./usuario-cli-edita.page.scss'],
})
export class UsuarioCliEditaPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form: FormGroup;
  formPass: FormGroup;
  usuario: IUsuario;
  usuId: '';
  myDate: Date;
  mensajeError:string;
  mensajeErrorModal:string;
  
  constructor(
    private firestore: AngularFirestore,
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private storage: StorageService,
    private router:Router,
    private alertController: AlertController
  ) { 
    this.form = this.formBuilder.group({
      apellido: [''],
      nombre:[''],
      fechaNac: [''],
      nroTelefono: [''],
    })
    this.formPass = this.formBuilder.group({
      //oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      newPass2: ['', Validators.required]
    })
  }

  ngOnInit() {
    //let usuId = '';
    console.log(this.storage.get('usuario'))
    this.storage.get('usuario').then((val)=>{ 
      this.usuId = val;
      console.log('usuario: '+this.usuId);
      this.usuarioService.getUser(this.usuId).subscribe((usu)=>{
        //console.log(usu);
        this.usuario = usu;
        this.form.controls.apellido.setValue(this.usuario.apellido);
        this.form.controls.nombre.setValue(this.usuario.nombre);
        //this.myDate = this.usuario.fechaNac;
        this.form.controls.fechaNac.setValue(this.usuario.fechaNac);
        this.form.controls.nroTelefono.setValue(this.usuario.nroTelefono);
      })
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
            console.log('alerta cancelada')
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            //this.handlerMessage = 'Alert confirmed';
            console.log('alerta confirmada')
            var usuCliUpdated = {
              apellido: this.form.controls.apellido.value,
              nombre: this.form.controls.nombre.value,
              fechaNac: this.form.controls.fechaNac.value,
              nroTelefono: this.form.controls.nroTelefono.value,
              rol: 'usuario-cliente'
            };
            this.usuarioService.updateUser(this.usuId, usuCliUpdated);
            console.log('Usuario actualizado')
            console.log(this.usuario)
            this.router.navigate(['/inicio']);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  editaPass(){
    //const oldPassword = this.formPass.controls.oldPass.value;
    const newPassword = this.formPass.controls.newPass.value;
    const newPassword2 = this.formPass.controls.newPass2.value;
    const email = '';
    const auth = getAuth();
    const user = auth.currentUser;
    //var flag = false;
    //const credential = EmailAuthProvider.credential(user.email,oldPassword);
    if(newPassword == newPassword2){
      /*
      reauthenticateWithCredential(user,credential).then(()=>{
        this.router.navigate(['/usuario-cli-edita']);
        console.log('reauth OK');
        //flag = true;
      */
      if(this.formPass.valid){  
        updatePassword(user, newPassword).then(() => {
            console.log('Contraseña actualizada')
            this.mensajeError = "Contraseña actualizada con éxito";
            this.modal.dismiss(null, 'cancel');
          }).catch((error) => {
            console.log('Error '+error)
            const errorCode = error.code;
            const errorMessage = error.message;
            this.fnErrorDialog(errorCode, email , newPassword);
            console.log('Código error: ' + errorCode + ' / Mensaje: ' + errorMessage);
            //this.modal.dismiss(null, 'cancel');
        });}else{
          this.mensajeErrorModal = "Los campos con * son obligatorios";
        }
      /*  
      }).catch((error)=>{
        console.log('reauth FAIL')
        console.log(error);
        this.mensajeError = "La contraseña actual ingresada es inválida. Vuelva a intentarlo";
        this.modal.dismiss(null, 'cancel');
        //flag = false;
        })
      */
    }else{
      console.log('else')
      this.mensajeErrorModal = "Las contraseñas ingresadas deben ser iguales";
      //this.modal.dismiss(null, 'cancel');
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  redirectInicio(){
    this.router.navigate(['/inicio']);
  }

  fnErrorDialog(errorCode,email,password){
    if (errorCode == 'auth/email-already-in-use') {
      this.mensajeErrorModal = "El email "+email+" ya está registrado. Por favor, ingrese una dirección de email distinta.";
    }
  
    if (errorCode == 'auth/weak-password') {
      this.mensajeErrorModal = "La contraseña debe tener más de 6 números o letras.";
    }

    if (errorCode == 'auth/operation-not-allowed') {
      this.mensajeErrorModal = "Debe ingresar una dirección de email y una contraseña.";
    }

    if (errorCode == 'auth/invalid-email') {
      this.mensajeErrorModal = "La dirección de email ingresada no es válida. El formato debe ser, por ejemplo, juan@email.com.";
    }
    
    if (errorCode == 'auth/user-disabled') {
      this.mensajeErrorModal = "El usuario "+email+" ha sido desabilitado.";
    }
    
    if (errorCode == 'auth/user-not-found') {
      this.mensajeErrorModal = 'El usuario con el email '+email+' no existe.';
    }
  
    if (errorCode == 'auth/wrong-password') {
      this.mensajeErrorModal = 'La contraseña es incorrecta.';
    }
  }

}
