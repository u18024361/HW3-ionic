import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Shared/service.service';
import { User } from '../Shared/user';
import { Storage } from '@ionic/storage-angular';
import { ThrowStmt } from '@angular/compiler';
import { ModalController } from '@ionic/angular';
import { AddUserPage } from './add-user/add-user.page';
import { AlertController } from '@ionic/angular';
import { UpdateUserPage } from './update-user/update-user.page';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  User: User;
  UserList: User[] = [];
  newUSer: User = <User>{};

  constructor(public alertController: AlertController,public service: ServiceService, private storage: Storage,public modalController: ModalController) {
    this.LoadUSers();
  }

  ngOnInit() {
    this.resetObject();
    this.LoadUSers();
  }

  LoadUSers() {
    this.service.getUser().then((users) => {
      this.UserList = users;
    });
  }

  // Add() {
  //   this.service.addUser(this.newUSer).then(() => {
  //     this.newUSer = <User>{};
  //     this.LoadUSers();
  //   });
  // }
 

  async Add() {
    const modal = await this.modalController.create({
      component: AddUserPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss()
      .then((data) => {
        this.LoadUSers();
    });
    
    return await modal.present();
  }

  async delete(id:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Deletion!',
      message: 'Will be deleted forever',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.service.deleteUser(id).then(item=>{
              this.LoadUSers();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async Update(User:User) {
    console.log(User);
    this.service.User = User;
    const modal = await this.modalController.create({
      component: UpdateUserPage,
      cssClass: 'my-custom-class',
     
      
    });

    modal.onDidDismiss()
      .then((data) => {
        this.LoadUSers();
    });
    
    return await modal.present();
  }


  resetObject() {
    this.User = {
      Id: 0,
      Name: '',
      Surname: '',
      Email:'',
      Password:'',
      Title:'',
      Role:'',
     
    };
  }
}
