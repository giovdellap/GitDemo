import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { getMaxCount } from '../../graphFactory/graphUtils';
import { pcaLoadingTimeSettings, simpleLoadingTimeSettings, XAxisLoadingTime } from '../../model/graphSettings/xaxisloadingtime';
import { ApiService } from '../../services/api.service';
import { requestScatterplotInsights } from '../../utils/insights';

@Component({
  selector: 'app-loadingtime-page',
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
  templateUrl: './loadingtime-page.component.html',
  styleUrl: './loadingtime-page.component.css'
})
export class LoadingtimePageComponent implements OnInit{
  optionControl = new FormControl()
  countOption = "stream_messages"
  options: string[] = ['input_tokens', 'total_tokens', 'stream_messages', 'input_dimension']

  insights: string[] = requestScatterplotInsights
  insightEmitter = new BehaviorSubject<string>(this.insights[0])
  insightObservable: Observable<string>

  titleBehaviourSubject = new BehaviorSubject<boolean>(true)
  titleObservable: Observable<boolean>

  normalFactory = new GraphFactory(1000, 600)
  pcaFactory = new GraphFactory(1000, 350)

  constructor(private apiService: ApiService) {
    this.titleObservable = this.titleBehaviourSubject.asObservable()
    this.insightObservable = this.insightEmitter.asObservable()
  }

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0])
    this.normalFactory.createSvg('scatter')
    this.pcaFactory.createSvg('pcagraph')
    this.newGraph()
    this.optionControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.apiService.getObservable().subscribe(() => this.controlValueChanges())
  }

  controlValueChanges() {
    this.normalFactory.removeSvg('scatter')
    this.pcaFactory.removeSvg('pcagraph')
    this.insightEmitter.next(this.insights[this.options.indexOf(this.optionControl.value)])
    this.newGraph()
  }

  newGraph() {
    let resObservable: Observable<any>
    console.log('OPTIONCONTROL: ', this.optionControl.value)
    console.log('COUNTOPTION: ', this.countOption)
    if (this.optionControl.value === this.countOption) {
      this.titleBehaviourSubject.next(false)
      resObservable = this.apiService.getBasicRequestQuery(this.optionControl.value).pipe(
        tap(
          res => this.getCountGraph(res, this.normalFactory, this.getSimpleOption(this.optionControl.value), [0, 150])
        )
      )
    } else {
      this.titleBehaviourSubject.next(true)
      resObservable = this.getSimpleObservable().pipe(mergeMap(() => this.getPCAObservable())
      )
    }

    resObservable.subscribe()
  }


  getSimpleObservable(): Observable<any> {
    return this.apiService.getBasicRequestQueryNoCount (this.optionControl.value).pipe(
      tap(
        res => this.getSimpleGraph(res, this.normalFactory, this.getSimpleOption(this.optionControl.value), [0, 150])
      )
    )

  }

  getPCAObservable(): Observable<any> {
    return this.apiService.getPCARequestQuery(this.optionControl.value).pipe(
      tap(
        res => this.getCountGraph(res, this.pcaFactory, this.getPCAOption(this.optionControl.value), [-3, 3])
      )
    )
  }

  getCountGraph(res: any[], factory: GraphFactory, option: XAxisLoadingTime, yAxisDomain: number[]) {
    factory.addXAxis(option.type, option.domain)
    factory.addYAxis('linear', yAxisDomain)
    factory.addRAxis([1, getMaxCount(res)], option.maxRay)
    factory.colorGrid()
    factory.addXAxisTitle(option.value)
    factory.addYAxisTitle('loading time')
    factory.addVariableScatterplotDots(res, option.value, 'loading_time')
    factory.addScatterplotDimensionLegend()
  }

  getSimpleGraph(res: any[], factory: GraphFactory, option: XAxisLoadingTime, yAxisDomain: number[]) {
    factory.addXAxis(option.type, option.domain)
    factory.addYAxis('linear', yAxisDomain)
    factory.colorGrid()
    factory.addXAxisTitle(option.value)
    factory.addYAxisTitle('loading time')
    factory.addSimpleScatterplotDots(res, option.value, 'loading_time', 1)
  }

  getSimpleOption(value: string): XAxisLoadingTime {
    for (let i = 0; i < simpleLoadingTimeSettings.length; i++) {
      if (simpleLoadingTimeSettings[i].value === value) {
        return simpleLoadingTimeSettings[i]
      }
    }
    return {} as XAxisLoadingTime
  }

  getPCAOption(value: string): XAxisLoadingTime {
    for(let i = 0; i < pcaLoadingTimeSettings.length; i++) {
      if(pcaLoadingTimeSettings[i].value === value) {
        return pcaLoadingTimeSettings[i]
      }
    }
    return {} as XAxisLoadingTime
  }

}
