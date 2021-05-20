import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/Shared/service.service';
import { User } from 'src/app/Shared/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  userold:User;
  user:User;
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
    this.user = this.service.User;
    this.userold =this.service.User;
    this.Form = this.FormB.group({

      Name: new FormControl(this.userold.Name, Validators.compose([Validators.required,Validators.minLength(2)])),
      Surname:  new FormControl(this.userold.Surname, Validators.required),
      Email: new FormControl(this.userold.Email, Validators.compose([Validators.required,Validators.email])),
      Password: new FormControl(this.userold.Password, Validators.required),
      Title: new FormControl(this.userold.Title, Validators.required),
      Role: new FormControl(this.userold.Role, Validators.required),
      Confirm: new FormControl('', Validators.required),

      

    });
  }

Update(){

console.log(this.user);

this.user = this.Form.value;
this.user.Id = this.userold.Id
this.service.updateUser(this.user).then(x=>{
  console.log(this.user);
  this.modalController.dismiss();
});
}
 
async closeModal() {
  await this.modalController.dismiss();
}

}
