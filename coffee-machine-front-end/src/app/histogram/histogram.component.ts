import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HistogramService } from './histogram.service';

@Component({
  selector: 'app-histogram',
  template:` 
<ngx-charts-bar-vertical
  [view]="view"

  [results]="single"
  [gradient]="gradient"
  [xAxis]="showXAxis"
  [yAxis]="showYAxis"
  [legend]="showLegend"
  [showXAxisLabel]="showXAxisLabel"
  [showYAxisLabel]="showYAxisLabel"
  [xAxisLabel]="xAxisLabel"
  [yAxisLabel]="yAxisLabel">
</ngx-charts-bar-vertical>
`,
  styles: [`
        .hero {
    background-image: url('/assets/img/coffee.jpg') !important;
    background-size:cover;
    background-position: center center;
    }
  
  `]
})
export class HistogramComponent implements OnInit {
  vars: any;
  single: any[] = [];
  multi: any[] = [];
  constructor(private histogramService: HistogramService) {this.getVars()}
  async getVars()
  {
     this.vars = await this.histogramService.getVars();
     for(let i =0; i < this.vars.names?.length; i++)
     {
       this.multi.push({name:this.vars.names[i],value:this.vars.count[i]});
       console.log(this.single);

     }
     this.single = this.multi;
  }


  view: [number,number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Employees';
  showYAxisLabel = true;
  yAxisLabel = 'Coffees ordered';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  ngOnInit(): void {
  }

}
