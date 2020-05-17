import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { item } from './Order.Item';
import { UserService } from '../../user.service';
import { records } from '../../entity/product';
import { LocalStorageService } from '../../utility/localStorage.service';
import { order } from '../../entity/Order';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  
  value: number = 300000;
  amount: number = 9;
  imgUrl: string;
  i = 1;
  imageArray: Array<string> = [];
  // products: Array<records> = [];
  products:any;
  productsToAddinCart: Array<records> = [];
  orderList: Array<order> = [];
  imageMapArray: any;
  public itemObject: item = new item();
  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) { }

  ngOnInit() {
    
    //this.myStorage.setRecordObject(null);
    this.imageMapArray = new Map();
    this.service.getAllProducts().subscribe(result => {
      
      this.products = result['records'];
      console.log(this.products)
      for (let index = 0; index < this.products.length; index++) {
        this.imageArray[index] = "assets/images/" + (index + 1) + ".png";
        this.imageMapArray.set(this.products[index].id, ("assets/images/" + (this.products[index].id) + ".png"));
      }

    });

    

  }

  onClick(value: any) {
    console.log()
  }

  singleProduct(product, picIndex) {
    product.src = "assets/images/" + (picIndex + 1) + ".png";
    this.service.sendSingleProductToOtherComponent(product);
    this.router.navigate(['/single']);
  }
  addProduct(product: any) {
    this.productsToAddinCart[this.productsToAddinCart.length] = product;
    
    //console.log(this.myStorage.getRecordObject())
    if(this.productsToAddinCart.length==1 && this.myStorage.getRecordObject()!=null)
    {
      for(let index1=0; index1<this.myStorage.getRecordObject().length;index1++)
      {
        this.productsToAddinCart[this.productsToAddinCart.length] = this.myStorage.getRecordObject()[index1];
      }
    }
    this.myStorage.setRecordObject(this.productsToAddinCart);
    console.log(this.myStorage.getRecordObject())
    this.service.sendPrductToOtherComponent(this.productsToAddinCart);
  }
  addtocart() {
    this.router.navigate(['/dashboard']);

  }
}
