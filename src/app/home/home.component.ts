import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

  taskName: string = "";
  userId: any;
  fireStoreTaskList: any;
  fireStoreList: any;
  fireStoreUser:any;
  fireStoreUserList:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public afAuth: AngularFireAuth, public firestore: AngularFirestore ) {   }

  ngOnInit(){
    this.afAuth.authState.subscribe((users) => {
      this.userId = this.afAuth.auth.currentUser.uid;
      users=this.userId;
        if(users){
          this.fireStoreUserList = this.firestore.collection('users').valueChanges();
          this.fireStoreTaskList = this.firestore.collection('tasks').valueChanges();
          this.fireStoreList = this.firestore.collection('tasks');
          this.fireStoreUser=this.firestore.collection('users');
        }
      });
  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      let id = this.firestore.createId();
      let list=this.firestore.collection('tasks').doc(id);
      list.set({
        uid: this.userId,
        id: id,
        taskName: task
      });
      this.taskName = "";
    }
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('/');
    });
  }

  async updateTask(index) {
    let alert = this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Update', handler: data => { this.fireStoreList.doc(index).update({ taskName: data.editTask }); } }
      ]
    });
    (await alert).present();
  }

  deleteTask(index) {
    return this.fireStoreList.doc(index).delete()
    .then( () => {
      console.log('Document successfully deleted!');
    }).catch( (error) => {
      console.error('Error removing document: ', error);
    });
  }

  remove(){
  return this.afAuth.authState.subscribe((authState) => {
      authState.delete();
      this.userId=this.afAuth.auth.currentUser.uid;
      this.fireStoreUser.doc(this.userId).delete();
      this.navCtrl.navigateRoot('/');
    });
  }

}
