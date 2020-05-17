import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { records } from '../entity/product';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { item } from '../includes/offers/Order.Item';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css']
})
export class FruitComponent implements OnInit {
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
    this.service.getAllProducts().subscribe(result => {
      this.productsVegitables=result['records'];
      console.log(this.myStorage.getProductType())
     
      this.product_TYPE=this.myStorage.getProductType();
      console.log(this.product_TYPE)
      for (let index4 = 0; index4 < this.productsVegitables.length; index4++) {
        console.log(this.productsVegitables[index4].product_type+"=="+this.product_TYPE);
        if (this.productsVegitables[index4].product_type==this.product_TYPE) {
          
          this.vegProduct[this.countVeg] = this.productsVegitables[index4];
          this.countVeg++;
        }
      }
      console.log(this.vegProduct)
      this.products = this.vegProduct;
      for (let index = 0; index < this.products.length; index++) {
        this.imageArray[index] = "assets/images/" + (index + 1) + ".png";
        this.imageMapArray.set(this.products[index].id, ("assets/images/" + (this.products[index].id) + ".png"));
      }

    });

    // this.imageMapArray = new Map();
    // this.service.getAllProducts().subscribe(result => {
    //   this.products = result;
    //   for (let index = 0; index < this.products.length; index++) {
    //     this.imageArray[index] = "assets/images/" + (index + 1) + ".png";
    //     this.imageMapArray.set(this.products[index].id, ("assets/images/" + (this.products[index].id) + ".png"));
    //   }

    // });

    this.itemObject.add = '1';
    this.itemObject.business = "";
    this.itemObject.discount_amount = '300';
    this.itemObject.currency_code = "$";
    this.itemObject.return = "";
    this.itemObject.cancel_return = "";
    this.itemObject.item_name = 'dogs food';
    this.itemObject.amount = "60000";

    this.amount = 9000;

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
