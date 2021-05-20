import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/Shared/service.service';
import { User } from 'src/app/Shared/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  newUSer: User = <User>{};
  Repeatpassword:string;
  Form: FormGroup;
  ErrorMessages ={
    'Name':[{type:'required', message:'Name is required'},{type:'minlength', message:'Name must be longer'}],
    'Surname':[{type:'required', message:'Surname is required'}],
    'Email':[{type:'required', message:'Email is required'},{type:'email', message:'Invalid Email'}],
    'Password':[{type:'required', message:'Password is required'}],
    'Title':[{type:'required', message:'Title is required'}],
    'Role':[{type:'required', message:'Role is required'}],
    'Confirm':[{type:'required', message:'Confrim Password is required'}],

  }

  constructor(public service: ServiceService,public modalController: ModalController, public FormB: FormBuilder) { }

  ngOnInit() {
    this.Form = this.FormB.group({

      Name: new FormControl('', Validators.compose([Validators.required,Validators.minLength(2)])),
      Surname:  new FormControl('', Validators.required),
      Email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      Password: new FormControl('', Validators.required),
      Title: new FormControl('', Validators.required),
      Role: new FormControl('', Validators.required),
      Confirm: new FormControl('', Validators.required),

    });
  }

  Add() {
    console.log(this.Form.value);
    this.newUSer = this.Form.value;
    console.log(this.newUSer);
      this.service.addUser(this.newUSer).then(() => {
        this.newUSer = <User>{};
         this.modalController.dismiss();
      });
     }
  

  async closeModal() {
    await this.modalController.dismiss();
  }

}
