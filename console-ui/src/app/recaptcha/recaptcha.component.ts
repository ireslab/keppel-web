import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 're-captcha',
    template: '<div class="g-recaptcha" [attr.data-sitekey]="sitekey" data-callback="verified" data-size="normal " ></div>',

})

export class recaptcha implements OnInit {
hello:boolean= false
    @Input() sitekey: any;
    @Output() tokenChange = new EventEmitter();
    demot: string = null;
    ngOnInit() {
        this.hello1();
        this.render();
        window['verified'] = (response) => this.verified(response);
    }
    hello1(){
       return this.hello
    };
    render() {
        this.hello=false;
        let script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    verified(response) {
        this.hello=true;
        this.tokenChange.emit({
            token: response
        });
    }
}
