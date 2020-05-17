import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class OfferService {


constructor(private http: HttpClient,private myStorage:LocalStorageService) { }

ngOnInit() {
  }

  getAllProducts() {
    return  this.http.get(this.myStorage.getdomainURL()+`/product/read.php`);
  }

  getSingleProduct(){
    return  this.http.get(this.myStorage.getdomainURL()+`/product/read_one.php?id=60`);
  }

//   saveAnswers(answerList: any,aid : number): Observable<any> {
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json; charset=utf-8'); 
//     console.log(this.myStorage.getdomainURL() + `/assessment/answer/create/`+aid);
//     return this.http.post(this.myStorage.getdomainURL() + `/assessment/answer/create/`+aid,answerList);
//   }

//   finalized(answerList:any,applicationId : number,assessmentStage:number): Observable<any> {
//     console.log("******************")
//     console.log(this.myStorage.getdomainURL() + `/assessment/finalize/`+applicationId+`/`+assessmentStage);
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json; charset=utf-8'); 
//     return this.http.post(this.myStorage.getdomainURL() + `/assessment/finalize/`+applicationId+`/`+assessmentStage,answerList);
//   }

}