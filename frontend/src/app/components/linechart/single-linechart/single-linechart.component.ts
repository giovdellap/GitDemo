import { Component } from '@angular/core';
import { PlotFactory } from '../../../graphFactory/plotFactory';
import { ApiService } from '../../../services/api.service';
import { LinechartService } from '../../../services/linechart.service';
import { NoSanitizePipe } from "../../../utils/nosanitizerpipe";

@Component({
  selector: 'app-single-linechart',
  standalone: true,
  imports: [NoSanitizePipe],
  templateUrl: './single-linechart.component.html',
  styleUrl: './single-linechart.component.css'
})
export class SingleLinechartComponent {

  svg: any
  factory = new PlotFactory(1200, 700)
  xAxis: string
  yAxis: string

  constructor(
    private apiService: ApiService,
    private linechartService: LinechartService
  ) {
    console.log('SINGLE COMPONENT')
    this.xAxis = linechartService.getYAxis()
    this.yAxis = 'tokens'
  }

  ngOnInit(): void {

    this.getGraph()

    this.linechartService.getYAxisObservable().subscribe((x: string) => {
      this.xAxis = x
      this.getGraph()
    })
    this.apiService.getObservable().subscribe(() => this.getGraph())
  }

  getGraph() {
    this.apiService.getBasicQueryNoCOunt(this.xAxis, 'tokens', 'all').subscribe(res => {
      //console.log('GET GRAPH 1')
      console.log('SINGLE LINECHART X AXIS: ', this.xAxis)
      console.log(res)
      this.svg = this.factory.getTokensBoxplot(res, this.xAxis).outerHTML
      //console.log('GET GRAPH 2')
    })
  }

}
