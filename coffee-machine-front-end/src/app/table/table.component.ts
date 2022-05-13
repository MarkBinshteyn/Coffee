import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  template: `
  <style>
p {
  background-image: url('/assets/img/coffee.jpg');
}
</style>
  <table class="table is-fullwidth">
  <thead>
    <tr>
      <th><abbr >Name of the employee</abbr></th>
      <th><abbr >Date of the order</abbr></th>
    </tr>
  </thead>
  <tbody>
            <tr *ngFor="let par of vars2">
                <td>{{par.names}}</td>
                <td>{{par.dates}}</td>
            </tr>
        </tbody>
        <button class="button is-dark" routerLink="/coffee">Go back</button><br>

`,
  styles: []
})
export class TableComponent implements OnInit {
  vars: any;
  vars2: {names:string,dates:string}[]= [];

  constructor(private tableService: TableService) { this.getVars() }

  ngOnInit(): void {
  }
  async getVars(){
    this.vars = await this.tableService.getTable();
    for(let i =0; i < this.vars.names.length; i++)
    {
      this.vars2.push({names:this.vars.names[i],dates:this.vars.dates[i]});
      console.log(this.vars2);
    }
  }

}
