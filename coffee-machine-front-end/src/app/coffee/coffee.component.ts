import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coffee',
  template:`
  <section class="hero is-fullheight is-link">
     <div class ="hero-body">
       <p class="subtitle ">
         Hello {{name}} what would you like to do?<br><br>
         <button class="button is-light" routerLink="/make">Make me a coffee!</button><br><br>
         <button class="button is-light" routerLink="/table">Show me all last month's coffee orders</button><br><br>
         <button class="button is-light" routerLink="/histogram">Show me a histogram of the coffeee machine usage</button><br><br>
         <button class="button is-light" (click)="logout()" routerLink="/">Logout</button><br>
     </div>

  </section>
`,
  styles: [`
        .hero {
    background-image: url('/assets/img/coffee.jpg') !important;
    background-size:cover;
    background-position: center center;
    }
  
  `]
})
export class CoffeeComponent implements OnInit {
   name = null;


  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem("jwt"));
    this.name = JSON.parse(localStorage.getItem("jwt") ?? '{}').name;
  }
  logout()
  {
    localStorage.setItem("jwt",'{}');
  }

}
