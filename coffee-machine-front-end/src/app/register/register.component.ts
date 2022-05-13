import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  template: ` 
      <section class="hero is-fullheight is-link">
       <div class="hero-head">
         <p class="title">
           Registration page!
         </p> 
       </div>
    <div class=hero-body>
      <div class="container">
        <form (ngSubmit)="submitForm()">
          <div class="field">
            <label>Name</label>
            <input type= "text" name="name" class="input" [(ngModel)]="name">
          </div>
          <div class="field">
            <label>Last name</label>
            <input type= "text" name="lastname" class="input" [(ngModel)]="lastname">
          </div>
          <div class="field">
            <label>Email</label>
            <input type= "text" name="email" class="input" [(ngModel)]="email">
          </div>
          <p>Are you one of the bosses? ;)</p>
          <input type="radio" id="yes" name="boss" value="True" [(ngModel)]="boss">
          <label for="html">Yes I am</label><br>
          <input type="radio" id="no" name="boss" value="False" [(ngModel)]="boss">
          <label for="css">Unfortunately not</label><br>
          <div class="field">
          <label for="pass">Password (5 characters minimum):</label>
          <input type="password" id="pass" name="password"
           minlength="5" required class="input" [(ngModel)]="password">
          </div>
          <button class="button is-light">Submit!</button>
        </form>
      </div>
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

export class RegisterComponent implements OnInit {
  name!: string;
  lastname!: string;
  email!: string;
  boss!: boolean;
  password!: string;



  constructor(private regiserService: RegisterService) { }

  ngOnInit(): void {
  }
  async submitForm(){
    console.log(this.boss);
    this.regiserService.insertUser(this.name,this.lastname,this.email,this.boss,this.password);
    alert('Thank you for registrating!');
    window.location.href = '/';
  }

}
