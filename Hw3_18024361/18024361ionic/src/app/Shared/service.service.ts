import { IfStmt } from '@angular/compiler';
import { Injectable, IterableDiffers } from '@angular/core';
import { User } from './user';
import { Storage } from '@ionic/storage-angular';
import { promise } from 'selenium-webdriver';

const Keyword ='Users';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
Userlist:User[]=[];
ID: number;
User:User;

private _storage: Storage | null = null;

  constructor(private storage: Storage) {this.init();}

  
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
 
addUser(user:User){
  return this.storage.get(Keyword).then((users:User[])=>{
    if(users){
      this.ID = users.length + 1;
      user.Id=this.ID;
      users.push(user)
      return this.storage.set(Keyword,users);
    }
    else{
     
      user.Id=1;
      return this.storage.set(Keyword,[user]);
    }
  });
}

getUser() :Promise<User[]>{
  return this.storage.get(Keyword);
}

updateUser(user:User) :Promise<any>{
  console.log(user);
  return this.storage.get(Keyword).then((users:User[])=>{
    if(!users || users.length == 0){
      return null;
    }
    let newUser:User[]=[];
    for(let i of users){
      if(i.Id === user.Id){
        newUser.push(user);
      }
      else{
        newUser.push(i);
      }
    }
    return this.storage.set(Keyword,newUser);
  });
}

deleteUser(id:number):Promise<User>{
  return this.storage.get(Keyword).then((users:User[])=>{
    if(!users || users.length == 0){
      return null;
    }
    let original:User[]=[]
    for(let i of users){
      if(i.Id !== id){
        original.push(i)
      }
    }
    return this.storage.set(Keyword,original);
  });
}

}

