import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { records } from '../entity/product';
import { user } from '../entity/user';
import { order } from '../entity/Order';
import { address_class } from '../entity/Address';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http:HttpClient) { }

  setLoggedInTrue(isLoggedin : string){
    localStorage.setItem('isLoggedin',isLoggedin);
  }

  setSingleProduct(records : Object)
  {
    localStorage.setItem('singleProduct',JSON.stringify(records));
  }

  getSingleProduct() : records{
    return JSON.parse(localStorage.getItem('singleProduct'));
  }

  setCurrentUserObject(user : Object){
    localStorage.setItem('user',JSON.stringify(user));
  }

  setAddress(address : Object){
    localStorage.setItem('addressValues',JSON.stringify(address));
  }

  getAddress() : address_class{
    return JSON.parse(localStorage.getItem('addressValues'));
  }

  setOrderId(orderIdValue : string)
  {
    localStorage.setItem('orderIdValue',orderIdValue);
  }

  getOrderId()
  {
    return localStorage.getItem('orderIdValue');
  }

  setProductType(productType:string)
  {
    localStorage.setItem('productType',productType);
  }

  getProductType()
  {
    return localStorage.getItem('productType');
  }

  getLoggedInTrue(){
    return localStorage.getItem('isLoggedin');
  }

  getdomainURL(){
    localStorage.setItem('domainURL','http://glintel.com/api');
    return localStorage.getItem('domainURL');
  }
  
  setRecordObject(user : any){
    localStorage.setItem('records',JSON.stringify(user));
  }

  getRecordObject() : any{
    return JSON.parse(localStorage.getItem('records'));
  }

  setInvoiceObject(user : any){
    localStorage.setItem('Invoice',JSON.stringify(user));
  }

  getInvoiceObject() : any{
    return JSON.parse(localStorage.getItem('Invoice'));
  }

  getCurrentUserObject() : user{
    return JSON.parse(localStorage.getItem('user'));
  }

  
  clearLoggedIn(){
    return localStorage.removeItem('isLoggedin');
  }

 
}
