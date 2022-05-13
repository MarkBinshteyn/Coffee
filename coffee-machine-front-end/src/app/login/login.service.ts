import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpClient: HttpClient){}

    async Validate(email: string, password: string){
        let result: any;
        try{
        result = await this.httpClient.post('http://localhost:3000/users/login/',{email,password}).toPromise();
        return result;
        }
        catch{
            return false;
        }
    }
}