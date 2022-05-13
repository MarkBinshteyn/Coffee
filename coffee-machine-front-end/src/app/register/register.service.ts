import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private httpClient: HttpClient){}

    insertUser(name: string, lastname: string, email:string, boss:boolean, password:string) {
        return this.httpClient.post('http://localhost:3000/users', {name:name,lastname:lastname,email:email,boss:boss,password:password}).subscribe();
    }
}