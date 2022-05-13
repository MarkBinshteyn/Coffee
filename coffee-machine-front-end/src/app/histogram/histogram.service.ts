import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class HistogramService {
    constructor(private httpClient: HttpClient){}

    async getVars(){
        
        let vars: any;
        vars = await this.httpClient.get('http://localhost:3000/make/histogram').toPromise();
        console.log(vars);
        return vars;

    }
}