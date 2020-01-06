import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmailValidator } from '../../validators/email';


@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  loading: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public afAuth: AngularFireAuth, 
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  async loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    .then(async () => {
        this.navCtrl.navigateRoot('/home');
      })
    .catch(async ()=>{
      let alert = this.alertCtrl.create({
        message: "The username or password do not match",
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      (await alert).present();
    });
}
}
