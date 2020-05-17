import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { records } from '../../entity/product';
import { LocalStorageService } from '../../utility/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products:any
  prductsBySearchData:any;
  productCount:any;
  start:any;
  userType:any;
  selectValue:any;
  loginTrue:string;
  searchValue:any;
  constructor(public router: Router, private service:UserService,public myStorage: LocalStorageService) { 
  }

  ngOnInit() {
    
    this.start=0;
    this.productCount=0;
    let set = new Set();
    
    this.loginTrue=this.myStorage.getLoggedInTrue();
    if(this.myStorage.getLoggedInTrue()=="true")
    {
      this.loginTrue="true";
    }
    else
    {
      this.loginTrue="false";
    }

    this.service.productData.subscribe(data => {
      if(this.myStorage.getRecordObject()!=null)
      {
        this.products=this.myStorage.getRecordObject();
        this.productCount=this.products.length;
      }else
      {
        this.productCount=0;
      }
    });

   
  }

  SearchData(searchValue)
  {
    this.searchValue=searchValue;
  }
    
  submitSearchData()
  {
    console.log(this.searchValue)
    this.service.searchByProductDetail(this.searchValue).subscribe(data=>{
      this.prductsBySearchData=data;
      this.service.sendSearchData(this.prductsBySearchData);     
      this.router.navigate(['/search']);
    });
  }

  cart()
  {
    this.service.sendPrductToOtherComponent(this.products);
    this.router.navigate(['/checkout']);
  }

  logout()
  {
    this.myStorage.clearLoggedIn();
    this.router.navigate(['/dashboard']);
  }

  selectChangeHandler(value:any)
  {
    this.router.navigate(['/'+this.selectValue]);
  }

  signUp()
  {
    this.service.signUpHeaderToLogin('signUp');
    this.router.navigate(['/login']);
  }

}


