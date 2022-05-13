import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `      
    <section class="hero is-fullheight is-link">
      <div class="hero-head">

        <p class="title">
          Hello and welcome to the coffee machine app!
        </p>
      </div>
      <div class="hero-body">
        <p class="subtitle ">
          Are you new to the company? 
          <button class="button is-light" routerLink="/register">New</button>
        </p>
      </div>
        <div class="hero-body">
        <p class="subtitle">
          Or are you already registered?
          <button class="button is-light" routerLink="/login">Registered</button>
        </p>

      </div>
    </section>
  
  `,
  styles:[`
  .hero {
    background-image: url('/assets/img/coffee.jpg') !important;
    background-size:cover;
    background-position: center center;
  }
  
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
