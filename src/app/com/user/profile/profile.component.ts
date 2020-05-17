import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { order } from '../entity/Order';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateAddressFlag:boolean;
  user:any;
  updateUserFlag: boolean;
  invoicesFlag: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  userData: any = [];
  orderValueUnique: Array<order> = [];
  countOrderValueUnique: any
  map: any;
  orderValue: any;
  idArray: Array<number> = [];
  invoiceList: any;
  changePasswordFlag:boolean;
  clicked: boolean;
  addressList: any;
  address: any;

  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) { }

  ngOnInit() {
    this.map = new Map();
    let set = new Set();
    this.dtOptions = {
      pagingType: 'first_last_numbers',
      pageLength: 10,
      responsive: true
    };

    this.service.getInvoice(1).subscribe(data => {
      this.orderValue = data['records'];


      for (let index = 0; index < this.orderValue.length; index++) {
        set.add(this.orderValue[index].order_id);
        this.idArray[index] = this.orderValue[index].order_id;
      }

      let countForUniqueOrder = Array.from(set);
      for (let index2 = 0; index2 < countForUniqueOrder.length; index2++) {
        this.countOrderValueUnique = 0;
        for (let index1 = 0; index1 < this.idArray.length; index1++) {

          if (countForUniqueOrder[index2] == this.idArray[index1]) {
            this.countOrderValueUnique++;
          }
        }

        for (let index4 = 0; index4 < this.orderValue.length; index4++) {

          if (countForUniqueOrder[index2] == this.orderValue[index4].order_id) {
            this.orderValueUnique[index2] = this.orderValue[index4];
          }
        }
        this.map.set(countForUniqueOrder[index2], this.countOrderValueUnique);
      }
    });

  }

  invoices() {
    this.invoicesFlag = true;
  }

  requestInvoice(orderId: any) {
    this.service.getSingleInvoice(orderId).subscribe(data => {
      let value = data['records'];
      this.invoiceList = value;
      this.service.sendInvoiceList(this.invoiceList);
      this.router.navigate(['/invoice']);
    });
  }

  updateProfile() {
    this.service.getUserById(this.myStorage.getCurrentUserObject().id).subscribe(data=>{
      this.user=data['records'][0];
    });
    this.updateUserFlag = true;
  }

  updateUserSubmit(updateUserValues:any) {
    console.log(updateUserValues)
    updateUserValues.id=this.myStorage.getCurrentUserObject().id;
    this.service.updateUser(updateUserValues).subscribe(data => {
      if (data['message'] == "user was updated.") {
        alert("User updated successfully!!")
      }
      else {
        alert("Please check data and try again!!")
      }
    }
    );
  }

  changePassword()
  {
    this.changePasswordFlag=true;
  }

  changePasswordSubmit(user:any)
  {
    console.log(user)
    user.id=this.myStorage.getCurrentUserObject().id;
    this.service.changePassword(user).subscribe(data=>{
      if (data['message'] == "Password changed successfully.") {
        alert(data['message'])
        location.reload();
      }
      else {
        alert("Please check data and try again!!")
      }
    });
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

  
  updateAddress()
  {
    this.dtOptions = {
      pagingType: 'first_last_numbers',
      pageLength: 10,
      responsive: true
    };
    this.updateAddressFlag=true;
    this.service.getAllAddress(this.myStorage.getCurrentUserObject().id).subscribe(data => {
      console.log(data)
      this.addressList = data['records'];
      this.dtTrigger.next();
    });
  }  

  editAddress(address) {
    this.service.addressFromProfileToAddressMethod(address);
    this.router.navigate(['/address']);
  }
}
