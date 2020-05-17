import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../utility/localStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service:UserService, private router: Router, private myStorage:LocalStorageService) { }
  email:any;
  phone:any;
  addressData:any;

  ngOnInit() {
    
    this.service.getEmail().subscribe(result => {
      this.addressData=result['records'][0];
      this.email=this.addressData.email;
      this.phone=this.addressData.mobile;
    })
  }

}
