import { Component, OnInit } from '@angular/core';
import { MakeCoffeeService } from './make-coffee.service';
@Component({
  selector: 'app-make-coffee',
  template: `  <section class="hero is-fullheight is-link">
  <div class ="hero-body">
    <div class="container">
      <p class="subtitle ">
        In how many minutes would you like your coffee? (skip if you want your coffee now)<br>
      </p>
        <form (ngSubmit)="submitForm()">
          <div class="field">
            <input type= "text" name="time" class="input" [(ngModel)]="time"><br>
            <button class="button is-light" routerLink="/make">Make me a coffee!</button><br><br>
          </div>
      </form>
      <button class="button is-light" routerLink="/coffee">Go back</button><br>
    </div>
  </div>

</section>`,
  styles: [`
  .hero {
background-image: url('/assets/img/coffee.jpg') !important;
background-size:cover;
background-position: center center;
}

`]
})
export class MakeCoffeeComponent implements OnInit {
time!: number;


constructor(private makeCoffeeService: MakeCoffeeService) { }

  ngOnInit(): void {
  }
  async submitForm(){
    if(this.time == null){
      let X = await this.makeCoffeeService.make(this.time, JSON.parse(localStorage.getItem("jwt") ?? '{}').name, JSON.parse(localStorage.getItem("jwt") ?? '{}').lastname , JSON.parse(localStorage.getItem("jwt") ?? '{}').boss);
      alert('Your coffee will be ready in '+(X+1)+' minutes');
    }
    else
    {
      alert('Your coffee will be ready in '+this.time.toString()+' minutes');
      this.makeCoffeeService.make(this.time, JSON.parse(localStorage.getItem("jwt") ?? '{}').name, JSON.parse(localStorage.getItem("jwt") ?? '{}').lastname, JSON.parse(localStorage.getItem("jwt") ?? '{}').boss); 
    }

  }

}
