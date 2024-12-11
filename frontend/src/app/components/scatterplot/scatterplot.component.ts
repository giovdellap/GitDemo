import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { getMaxCount } from '../../graphFactory/graphUtils';
import { XAxisScatterplot, xScatterplotSettings } from '../../model/graphSettings/xAxisScatterplot';
import { YAxisScatterplot, yScatterplotSettings } from '../../model/graphSettings/yAxisScatterplot';
import { models, ModelScatterplot, scatterplotModels } from '../../model/models';
import { BasicQueryNoCountResponseItem } from '../../model/queryresponses/basicQueryNoCountResponse';
import { ApiService } from '../../services/api.service';
import { scatterplotinsightsXAxis } from '../../utils/insights';

@Component({
  selector: 'app-scatterplot',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './scatterplot.component.html',
  styleUrl: './scatterplot.component.css'
})
export class ScatterplotComponent implements OnInit{

  xAxisOptions = xScatterplotSettings
  xAxis: XAxisScatterplot = this.xAxisOptions[0]
  xAxisControl = new FormControl<XAxisScatterplot>(this.xAxis)
  insightEmitter = new BehaviorSubject<string>(this.xAxis.insight)
  insightObservable: Observable<string>

  yAxisOptions = yScatterplotSettings
  yAxis: YAxisScatterplot = this.yAxisOptions[0]
  yAxisControl = new FormControl<YAxisScatterplot>(this.yAxis)

  models = scatterplotModels
  model = this.models[0]
  modelControl = new FormControl<ModelScatterplot>(this.model)

  temperatureEmitter = new BehaviorSubject<boolean>(false)
  temperatureObservable: Observable<boolean>
  presenceEmitter = new BehaviorSubject<boolean>(false)
  presenceObservable: Observable<boolean>

  colored = false
  coloredEmitter = new BehaviorSubject<boolean>(this.colored)
  coloredObservable: Observable<boolean>

  factory = new GraphFactory(1200, 800)

  insights = scatterplotinsightsXAxis

  constructor(private apiService: ApiService) {
    this.coloredObservable = this.coloredEmitter.asObservable()
    this.insightObservable = this.insightEmitter.asObservable()
    this.temperatureObservable = this.temperatureEmitter.asObservable()
    this.presenceObservable = this.presenceEmitter.asObservable()
  }

  ngOnInit(): void {
    this.factory.createSvg('scatter')
    this.getGraph()
    this.xAxisControl.valueChanges.subscribe(() => this.valueChanges())
    this.yAxisControl.valueChanges.subscribe(() => this.valueChanges())
    this.modelControl.valueChanges.subscribe(() => this.valueChanges())
    this.apiService.getObservable().subscribe(() => this.valueChanges())
  }

  onClickColored() {
    this.colored = !this.colored
    this.coloredEmitter.next(this.colored)
    this.valueChanges()
  }

  valueChanges() {
    this.xAxis = this.xAxisControl.value || {} as XAxisScatterplot
    this.yAxis = this.yAxisControl.value || {} as YAxisScatterplot
    this.model = this.modelControl.value || {} as ModelScatterplot
    this.temperatureEmitter.next(this.xAxis.value === 'temperature')
    this.presenceEmitter.next(this.xAxis.value === 'presence_penalty')
    this.insightEmitter.next(this.xAxis.insight)
    this.factory.removeSvg('scatter')
    this.getGraph()
  }

  getGraph() {
    console.log('XAXIS: ', this.xAxis)
    console.log('YAXIS: ', this.yAxis)
    if(this.colored) {
      this.getColoredScatterplot()
    } else {
      this.getCountScatterplot()
    }
  }

  getCountScatterplot() {
    this.apiService.getBasicQuery(this.yAxis.value, this.xAxis.value, this.model.value).subscribe(res => {
      let arr = res
      for (var item of arr) {

        if (this.xAxis.value === 'temperature' && isNaN(item.temperature)) {
          arr.splice(arr.indexOf(item), 1)
        }
        if (this.xAxis.value === 'presence_penalty' && isNaN(item.presence_penalty)) {
          arr.splice(arr.indexOf(item), 1)
        }
      }
      //this.factory.createSvg('scatter')
      this.factory.addXAxis(this.xAxis.type, this.xAxis.domain)
      this.factory.addYAxis(this.yAxis.type, this.yAxis.domain)
      this.factory.addRAxis([1, getMaxCount(arr)], this.xAxis.maxRay)
      this.factory.colorGrid()
      this.factory.addXAxisTitle(this.xAxis.value)
      this.factory.addYAxisTitle(this.yAxis.value)
      this.factory.addVariableScatterplotDots(arr, this.xAxis.value, this.yAxis.value)
      this.factory.addScatterplotDimensionLegend()
    })
  }

  getColoredScatterplot() {

    let observables = []
    let realModels = models.slice(1)
    for (let i = 0; i < realModels.length; i++) {
      observables.push(
        this.apiService.getBasicQueryNoCOunt(this.yAxis.value, this.xAxis.value, realModels[i]).pipe(
          map((x: BasicQueryNoCountResponseItem[]) => {
            //console.log('X: ', x)
            for (let j = 0; j < x.length; j++) {
              x[j].model = realModels[i]
            }
            return x
          })
        ))
    }
    forkJoin(observables).subscribe((res: any[]) => {
      //console.log('FORKJOIN: ',res)
      let result: BasicQueryNoCountResponseItem[] = []
      for (let i = 0; i < res.length; i++) {
        result = result.concat(res[i])
      }
      console.log(result)
      this.factory.addColoredBackground()
      this.factory.addXAxis(this.xAxis.type, this.xAxis.domain)
      this.factory.addYAxis(this.yAxis.type, this.yAxis.domain)
      this.factory.colorGrid()
      this.factory.addXAxisTitle(this.xAxis.value)
      this.factory.addYAxisTitle(this.yAxis.value)
      this.factory.addColoredScatterplotDots(result, this.xAxis.value, this.yAxis.value)
    })
  }


}
