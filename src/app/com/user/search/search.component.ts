import { Component, OnInit } from '@angular/core';
import { records } from '../entity/product';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { item } from '../includes/offers/Order.Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  value: number = 300000;
  countVeg:number=0;
  amount: number = 9;
 // product_TYPE:string="Fruit";
 product_TYPE:string="";
  imgUrl: string;
  i = 1;
  imageArray: Array<string> = [];
  // products: Array<records> = [];
  products:any;
  productsVegitables:any;
  productsToAddinCart: Array<records> = [];
  imageMapArray: any;
  vegProduct: Array<records> = [];
  public itemObject: item = new item();
  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) { }

  ngOnInit() {
    //location.reload();
    
    //this.myStorage.setRecordObject(null);
    this.imageMapArray = new Map();
    this.service.searchData.subscribe(data => {
      this.products=data['records'];
      
      for (let index = 0; index < this.products.length; index++) {
        this.imageArray[index] = "assets/images/" + (index + 1) + ".png";
        this.imageMapArray.set(this.products[index].id, ("assets/images/" + (this.products[index].id) + ".png"));
      // this.imageMapArray.set(this.products[index].product_id, ("assets/images/" + (this.products[index].product_id) + ".png"));
      }
//"assets/images/id.png"
    });


  }

  onClick(value: any) {
    console.log()
  }

  singleProduct(product, picIndex) {
    product.src = "assets/images/" + (picIndex + 1) + ".png";
    //this.service.sendSingleProductToOtherComponent(product);
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
    //this.service.sendPrductToOtherComponent(this.productsToAddinCart);
  }
  addtocart() {
    this.router.navigate(['/dashboard']);

  }
}
