import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';


  constructor(private router: Router) { }

  ngOnInit() {
  //   if (this.router.url === '/keppel') {
  //     debugger
  //     console.log("red")  
  //   }else{
  //     console.log("blue")
  //     console.log(this.router.url)
  //   }
  }

}
