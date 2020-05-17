import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../utility/localStorage.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  count:number;
  constructor(private service:UserService, private router: Router, private myStorage:LocalStorageService) { }
  productType:string="default";
  ngOnInit() {
  }

  callProductTypeVeg(productType:any){
    this.myStorage.setProductType(productType);
    this.router.navigate(['/vegitables']);
    
  }

  callProductTypeFruit(productType:any){
  
    this.myStorage.setProductType(productType);
    this.router.navigate(['/fruit']);
    
  }

}
