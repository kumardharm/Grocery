import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { records } from '../entity/product';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  productsToAddinCart: Array<records> = [];
  product:any;
  imageArray:Array<string>=[];

  constructor(private router: Router, private service:UserService, private myStorage:LocalStorageService) { }

  ngOnInit() {
    
    this.service.singleProduct.subscribe(data => {
      if(data!="defaultSingle")
      {
        this.myStorage.setSingleProduct(data);
      }
      this.product=this.myStorage.getSingleProduct();
      //this.product=data;
      this.imageArray[0]="assets/images/" + this.product.id + ".png";
    });
  }

  singleProduct(product:any)
  {

  }

  addProduct(product: any) {
    this.productsToAddinCart[this.productsToAddinCart.length] = product;
    if(this.productsToAddinCart.length==1 && this.myStorage.getRecordObject()!=null)
    {
      for(let index1=0; index1<this.myStorage.getRecordObject().length;index1++)
      {
        this.productsToAddinCart[this.productsToAddinCart.length] = this.myStorage.getRecordObject()[index1];
      }
    }
    this.myStorage.setRecordObject(this.productsToAddinCart);
    this.service.sendPrductToOtherComponent(this.productsToAddinCart);
  }

}
