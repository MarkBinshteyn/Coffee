import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MakeCoffeeService {
    constructor(private httpClient: HttpClient){}

    async make(time: number, name: string, lastname: string, boss: boolean){
        //The idea here is to send a request to the back-end and get in return the time that is left until coffee is ready
        let timeLeft: any;
        timeLeft = await this.httpClient.post('http://localhost:3000/make',{time,name, lastname,boss}).toPromise();
        console.log(timeLeft);
        return timeLeft;

    }
}