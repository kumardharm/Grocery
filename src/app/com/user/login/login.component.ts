import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { user } from '../entity/user';


@Component({
  selector: 'app-cart',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  products: any;
  productCount = 0;
  role: string = "Admin";
  users: any;
  id: string;
  password: string;
  userToSendDatabase: user = new user();
  userForChangePassword: user = new user();
  isLoggedin: string = "true";
  imageArray: Array<string> = [];
  signUpFlag: boolean;
  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) {
  }

  ngOnInit() {

    this.service.signUpData.subscribe(data => {
      if (data == 'signUp') {
        this.signUpFlag = true;
      }
    });
  }

  onLoggedin(formvalues: any) {

    this.userToSendDatabase.id = formvalues.id;
    this.userToSendDatabase.password = formvalues.password;
    this.userToSendDatabase.role = this.role;
    this.service.getLoginUser(this.userToSendDatabase).subscribe(data => {
      this.users = data;

      if (this.users.id == this.userToSendDatabase.id) {
        this.myStorage.setCurrentUserObject(this.users);
        this.myStorage.setLoggedInTrue("true");
        if (this.myStorage.getRecordObject() != null) {
          this.router.navigate(['/checkout']);
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      }
      else {
        alert("Please check password and try again!!")
      }
    }
    );

  }

  signUp() {
    this.signUpFlag = true;
  }

  login() {
    this.signUpFlag = false;
  }

  changePassword(formvalues: any) {
    this.userForChangePassword = formvalues;
    this.service.changePassword(this.userForChangePassword).subscribe(data => {
      if (data['message'] == "Password changed successfully.") {
        location.reload();
      }
      else {
        alert("Please check data and try again!!")
      }
    }
    );
  }

  createAccount(formvalues: any) {
    this.service.signUp(formvalues).subscribe(data => {
      if (data['message'] == "user was inserted into database.") {
        location.reload();
      }
      else {
        alert("Please check data and try again!!")
      }
    }
    );
  }

  forgetPassword()
  {
    let id=this.myStorage.getCurrentUserObject().id;
    console.log(id)
    this.service.forgetPassword(id).subscribe(data=>
      {
        alert(data['message']);
      }
    );
  }

}
