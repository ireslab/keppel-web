import { Component, OnInit, AfterViewChecked } from '@angular/core';


declare let paypal: any;

@Component({
  selector: 'app-pay-pal',
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.css']
})
export class PayPalComponent implements AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox : 'AcjkuRx3vzAjoZ4IDELaXZ_CTt9qnv8edY-37d2xx6yo5mAEsq0CYD2TTQNcOxC5JW5c1EJArU_wmWpz',
      production: ''
    },
    commit : true,
    payment: (data,actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        alert('payment successfully done')
      })
    }

  };


  ngAfterViewChecked(): void {
    if(!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn')
        this.paypalLoad =false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
