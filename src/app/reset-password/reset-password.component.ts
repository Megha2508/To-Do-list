import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.component.html',
})
export class ResetPasswordPage {
  public resetPwdForm: FormGroup

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.resetPwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetUserPwd() {
    this.afAuth.auth.sendPasswordResetEmail(this.resetPwdForm.value.email).then(async (user) => {
      let alert = this.alertCtrl.create({
        message: "We just sent a link to reset your password to your email.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      (await alert).present();
    }, async (error) => {
      let errorAlert = this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      (await errorAlert).present();
    });
  }

}