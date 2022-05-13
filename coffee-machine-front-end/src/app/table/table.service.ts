import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class TableService {
    constructor(private httpClient: HttpClient){}

    async getTable(){
        
        let vars: any;
        vars = await this.httpClient.get('http://localhost:3000/make/table').toPromise();
        console.log(vars);
        return vars;

    }
}