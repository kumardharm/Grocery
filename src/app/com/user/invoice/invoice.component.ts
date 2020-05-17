import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utility/localStorage.service';
import { order } from '../entity/Order';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceList: any;
  invoiceData: any;
  invoiceDataLength: number;
  invoiceListFromCheckout: Array<order> = [];
  constructor(private router: Router, private service: UserService, private myStorage: LocalStorageService) { }

  ngOnInit() {

    this.service.invoiceData.subscribe(data => {
      console.log(this.invoiceData)
      if(data!="Default")
      {
        this.myStorage.setInvoiceObject(data);
      }
      this.invoiceData=this.myStorage.getInvoiceObject();
     
    });

  }

  done()
  {
    this.router.navigate(['/dashboard']);
  }

}
