import { Injectable } from '@angular/core';
import { LocalStorageService } from './utility/localStorage.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private myStorage: LocalStorageService) {

  }

  getAllProducts() {
    return this.http.get(this.myStorage.getdomainURL() + `/product/read.php`);
    //return this.http.get(this.myStorage.getdomainURL() + `/product/discounted_product.php`);
  }

  getSingleProduct() {
    return this.http.get(this.myStorage.getdomainURL() + `/product/read_one.php?id=60`);
  }

  getAllAddress(userId: string) {
    return this.http.get(this.myStorage.getdomainURL() + `/login/user_address.php?id=` + userId);
  }

  getSingleInvoice(orderId: any) {
    return this.http.get(this.myStorage.getdomainURL() + `/invoice/read_invoice.php?id=` + orderId);
  }

  getInvoice(id: any) {
    return this.http.get(this.myStorage.getdomainURL() + `/invoice/invoice_list.php?id=` + id);
  }

  getLoginUser(user: Object): Observable<Object> {
    return this.http.post(this.myStorage.getdomainURL() + `/login/userlogin.php`, user);
  }

  searchByProductDetail(value: any) {
    return this.http.get(this.myStorage.getdomainURL() + `/product/search.php?s=` + value);
  }

  saveOrderDetails(Order: Object): Observable<Object> {
    return this.http.post(this.myStorage.getdomainURL() + `/invoice/invoice.php`, Order);
  }

  getEmail() {
    return this.http.get(this.myStorage.getdomainURL() + `/app/application.php`);
  }

  saveAddress(addressObject: Object) {
    return this.http.post(this.myStorage.getdomainURL() + `/login/new_address.php`, addressObject);
  }

  signUp(user: Object): Observable<Object> {
    return this.http.post(this.myStorage.getdomainURL() + `/login/register_user.php`, user);
  }

  changePassword(user: Object): Observable<Object> {
    return this.http.post(this.myStorage.getdomainURL() + `/login/change_password.php`, user);
  }

  getUserById(userId:any)
  {
    return this.http.get(this.myStorage.getdomainURL() + `/login/userbyid.php?id=`+userId);
  }

  updateUser(user: Object): Observable<Object> {
    return this.http.post(this.myStorage.getdomainURL() + `/login/user_update.php`, user);
  }

  updateAddress(address: Object): Observable<Object> {
    console.log(this.myStorage.getdomainURL() + `/login/address_update.php`, address)
    return this.http.post(this.myStorage.getdomainURL() + `/login/address_update.php`, address);
  }

  forgetPassword(userId:any)
  {
    return this.http.get(this.myStorage.getdomainURL() + `/login/forgot_password.php?id=`+userId);
  }

  private comptransfer = new BehaviorSubject("Default");
  productData = this.comptransfer.asObservable();

  sendPrductToOtherComponent(messsage) {
    this.comptransfer.next(messsage);
  }

  private comptransferForSingleProduct = new BehaviorSubject("defaultSingle");

  singleProduct = this.comptransferForSingleProduct.asObservable();

  sendSingleProductToOtherComponent(messsage4) {
    this.comptransferForSingleProduct.next(messsage4);
  }

  getIpAddress(): Observable<any> {
    const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });
    return this.http.get('http://ipinfo.io');
  }

  private handleError(error: HttpErrorResponse):
    Observable<any> {
    console.error('observable error: ', error);
    return Observable.throw(error);
  }

  private comptransferForInvoice = new BehaviorSubject("Default");
  invoiceData = this.comptransferForInvoice.asObservable();

  sendInvoiceList(messsage1) {
    this.comptransferForInvoice.next(messsage1);
  }

  private comptransferForSearch = new BehaviorSubject("nothing");
  searchData = this.comptransferForSearch.asObservable();

  sendSearchData(messsage2) {
    this.comptransferForSearch.next(messsage2);
  }

  private comptransferForSignUp = new BehaviorSubject("signUpDefault");
  signUpData = this.comptransferForSignUp.asObservable();

  signUpHeaderToLogin(messsage6) {
    this.comptransferForSignUp.next(messsage6);
  }

  private comptransferForAddress = new BehaviorSubject("addressDefault");
  addressFromProfileToAddress = this.comptransferForAddress.asObservable();

  addressFromProfileToAddressMethod(messsage6) {
    this.comptransferForAddress.next(messsage6);
  }

}
