import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address:any;
  
  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) { }

  ngOnInit() {
   this.service.addressFromProfileToAddress.subscribe(data=>{
    if(data!='addressDefault')
    {
      this.myStorage.setAddress(data);
    }
    this.address=this.myStorage.getAddress();
    
   });

  }

  updateAddress(address:any)
  {
    console.log(address)
    this.service.updateAddress(address).subscribe(data=>{
      alert(data['message']);
    });
  }


}
