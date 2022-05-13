import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  template:`
        <section class="hero is-fullheight is-link">
           <div class="hero-head">
             <p class="title">
               Login page!
             </p> 
           </div>
           <div class=hero-body>
             <div class="container">
             <form (ngSubmit)="submitForm()">
                 <div class="field">
                   <label>Email</label>
                     <input type= "text" name="email" class="input" [(ngModel)]="email">
                 </div>
                 <div class="field">
                   <label for="pass">Password</label>
                     <input type="password" id="pass" name="password" required class="input" [(ngModel)]="password">
                 </div>
                 <button class="button is-light">Login!</button>
               </form>
             </div>
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
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  async submitForm()
  {
    let bool = await this.loginService.Validate(this.email,this.password);
    if(bool.success)
    {
      let decoded: any = jwt_decode(bool.token);
      localStorage.setItem('jwt', JSON.stringify (decoded));
      alert('Welcome '+decoded.name);
      window.location.href = '/coffee';
    }
    else
    {
      alert('User name or password are incorrect please try again :(');
    }
  }
}
