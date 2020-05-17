import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { records } from '../entity/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user } from '../entity/user';
import { order } from '../entity/Order';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { address_class } from '../entity/Address';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form = new FormGroup({
    address: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address_type: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  myDate = Date.now();
  clicked: boolean;
  addressList: any;
  address: any;
  deliveryToThisAddress: boolean;
  SavedUser: boolean = false;
  public orderObject: order = new order();
  createNewAddress: boolean = false;
  paymentDoneFlag: boolean;
  payment: boolean;
  productsForCount: any;
  productsForCountDecreseElements: any;

  products: any
  productsUnique: Array<records> = [];
  orderListForInvoice: Array<order> = [];
  orderList: Array<order> = [];
  users: Array<user> = [];
  finalProductList: Array<records> = [];
  productCount = 0;
  imageArray: Array<string> = [];
  idArray: Array<number> = [];
  idArrayCopy: Array<number> = [];
  countProduct: number;
  map: any;
  imageMapArray: any;
  getRecortList: any;
  count: any;
  countAdd: any;
  finalProductListCount: any;
  loggedInTrue: boolean;
  dateValue: string;
  sum: number;
  orderIdForOneUser: string;
  invoiceList: any;
  private _prevSelected: any;
  public addressObject: address_class = new address_class();

  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) {

  }
  ngOnInit() {
   
    this.dateValue = this.myDate.toLocaleString();
    this.orderIdForOneUser = this.dateValue.replace(/,/g, '');
    this.deliveryToThisAddress = false;
    this.createNewAddress = false;
    this.paymentDoneFlag = false;
    this.payment = false;
    this.countAdd = 0;
    this.count = 0;
    this.products = this.myStorage.getRecordObject();
    this.service.getAllAddress(this.myStorage.getCurrentUserObject().id).subscribe(data => {
      this.addressList = data['records'];
      

    });

    this.map = new Map();
    this.imageMapArray = new Map();
    let set = new Set();
    for (let index = 0; index < this.products.length; index++) {
      set.add(this.products[index].id);
      this.idArray[index] = this.products[index].id;
      this.imageArray[index] = "assets/images/" + (index + 1) + ".png";
      this.imageMapArray.set(this.products[index].id, ("assets/images/" + (this.products[index].id) + ".png"));
    }

    let countArrayForUniqueProduct = Array.from(set);
    for (let index2 = 0; index2 < countArrayForUniqueProduct.length; index2++) {
      this.countProduct = 0;
      for (let index1 = 0; index1 < this.idArray.length; index1++) {

        if (countArrayForUniqueProduct[index2] == this.idArray[index1]) {
          this.countProduct++;
        }
      }

      for (let index4 = 0; index4 < this.products.length; index4++) {

        if (countArrayForUniqueProduct[index2] == this.products[index4].id) {
          this.productsUnique[index2] = this.products[index4];
        }
      }
      this.map.set(countArrayForUniqueProduct[index2], this.countProduct);
    }

    this.sum = 0.00;
    this.getAddition();

    if (this.myStorage.getLoggedInTrue() == "true") {

      this.loggedInTrue = true;
    }
    else {
      this.loggedInTrue = false;
    }


  }

  savedUserAddress(evt) {
    var target = evt.target;
    if (target.checked) {
      this.createNewAddress = false;
      this._prevSelected = target;
      this.SavedUser = true;
    }
  }

  setAddress(evt, address) {
    var target = evt.target;
    if (target.checked) {
      this.clicked = true;
      this.address = address;
    }
  }

  addNewAddress(evt) {
    this.SavedUser = false;
    var target = evt.target;
    if (target.checked) {

      this._prevSelected = target;
      this.createNewAddress = true;
    }
  }

  paymentDone() {
    this.dateValue = this.myDate.toLocaleString();
    this.orderIdForOneUser = this.dateValue.replace(/,/g, '');
    for (let index8 = 0; index8 < this.productsUnique.length; index8++) {
      this.orderObject.order_id = this.orderIdForOneUser;
      this.orderObject.invoice_number = "invoice" + (this.productsUnique[index8].id + this.orderIdForOneUser);
      this.orderObject.shipping_address = this.address.address + " " + this.address.city + " " + this.address.state + " " + this.address.zip + " " + this.address.country + " ";
      this.orderObject.billing_address = this.address.address + " " + this.address.city + " " + this.address.state + " " + this.address.zip + " " + this.address.country + " ";
      this.orderObject.sgst = (this.productsUnique[index8].price * 10) / 100;
      this.orderObject.cgst = (this.productsUnique[index8].price * 10) / 100;
      this.orderObject.product_id = "" + this.productsUnique[index8].id;
      this.orderObject.sub_id = this.map.get(this.productsUnique[index8].id);
      this.orderObject.product_name = this.productsUnique[index8].name;
      this.orderObject.product_qty = this.map.get(this.productsUnique[index8].id);
      this.orderObject.product_price = this.productsUnique[index8].price;
      this.orderObject.total_amt = (this.productsUnique[index8].price) * this.map.get(this.productsUnique[index8].id);
      this.orderObject.discount = 0;
      this.orderObject.sub_id=this.productsUnique[index8].sub_id;
      this.orderObject.user_id = this.myStorage.getCurrentUserObject().id;
      this.service.saveOrderDetails(this.orderObject).subscribe();
      this.orderListForInvoice[index8] = this.orderObject;

    }
    this.service.sendInvoiceList(this.orderListForInvoice);
    this.paymentDoneFlag = true;
    this.myStorage.setRecordObject(null);
    this.router.navigate(['/invoice']);

  }

  checkout(formvalues: any) {
  
    this.addressObject.user_id = this.myStorage.getCurrentUserObject().id;
    this.addressObject.address = formvalues.address;
    this.addressObject.address_type = formvalues.address_type;
    this.addressObject.state = formvalues.state;
    this.addressObject.city = formvalues.city;
    this.addressObject.zip = formvalues.zip;
    this.addressObject.country = formvalues.country;
    this.addressObject.name = formvalues.name;
    this.addressObject.mobile = formvalues.mobile;
    this.addressObject.landmark = formvalues.landmark;
    this.service.saveAddress(this.addressObject).subscribe();
    this.address = formvalues;
    this.payment = true;
  }

  paymentPage()
  {
    this.payment = true;
  }

  getAddition() {
    for (let index6 = 0; index6 < this.productsUnique.length; index6++) {
      for (let index7 = 0; index7 < this.map.get(this.productsUnique[index6].id); index7++) {
        this.sum = +this.productsUnique[index6].price + this.sum;
      }

    }
  }

  singleProduct(product, picIndex) {
    product.src = "assets/images/" + (picIndex + 1) + ".png";
    this.service.sendSingleProductToOtherComponent(product);
    this.router.navigate(['/single']);
  }

  countProductMethod(product: any, stage: any) {
    this.countAdd = 0;

    if (stage == 1) {
      this.productsForCount = this.myStorage.getRecordObject();
      this.productsForCount[this.productsForCount.length] = product;
      this.myStorage.setRecordObject(null);
      this.myStorage.setRecordObject(this.productsForCount);
      for (let index = 0; index < this.myStorage.getRecordObject().length; index++) {
        if (this.myStorage.getRecordObject()[index].id == product.id) {
          this.countAdd++;
        }
      }
    }
    else {
      this.productsForCountDecreseElements = this.myStorage.getRecordObject();
      for (let i = 0; i < this.productsForCountDecreseElements.length; i++) {
        if (this.productsForCountDecreseElements[i].id == product.id) {
          this.productsForCountDecreseElements.splice(i, 1);
          break;
        }
      }
      this.myStorage.setRecordObject(null);
      this.myStorage.setRecordObject(this.productsForCountDecreseElements);
      for (let index = 0; index < this.myStorage.getRecordObject().length; index++) {
        if (this.myStorage.getRecordObject()[index].id == product.id) {
          this.countAdd++;
        }
      }
    }
    this.map.set(product.id, this.countAdd);
    this.sum = 0.00;
    this.getAddition();
    return true;
  }

  deleteProduct(product: any) {
    for (let index4 = 0; index4 < this.productsUnique.length; index4++) {
      if (product.id == this.productsUnique[index4].id) {
        this.productsUnique.splice(index4, 1);
        break;
      }
    }

    this.finalProductListCount = 0;
    let productListToDelete;
    this.finalProductList;
    //productListToDelete = this.myStorage.getRecordObject();
    for (let i = 0; i < this.myStorage.getRecordObject().length; i++) {
      if (this.myStorage.getRecordObject()[i].id != product.id) {
        this.finalProductList[this.finalProductListCount] = this.myStorage.getRecordObject()[i];

        this.finalProductListCount++;
      }
    }


    this.myStorage.setRecordObject(null);
    this.myStorage.setRecordObject(this.finalProductList);

    return true;
  }

}
