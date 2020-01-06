import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html',
})
export class RegisterPage {
  public signupForm: FormGroup;
  

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController, public afAuth: AngularFireAuth, public firestore: AngularFirestore ) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      retype: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      firstName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }


  async signupUser() {
    if (this.signupForm.value.password == this.signupForm.value.retype) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          let userId = this.afAuth.auth.currentUser.uid;
          let userDoc = this.firestore.collection('users').doc(userId);
          userDoc.set({
            UserId: userId,
            firstName: this.signupForm.value.firstName,
            lastName: this.signupForm.value.lastName,
            email: this.signupForm.value.email,
            password: this.signupForm.value.password
          });
          this.navCtrl.navigateRoot('/');
        })
        .catch(async ()=>{
          let alert = this.alertCtrl.create({
            message: "Account with this email already exists. Use a different email ID.",
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          (await alert).present();
        });
    } else {
      let alert = this.alertCtrl.create({
        message: "The passwords do not match.",
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      (await alert).present();
    }
  }

}
