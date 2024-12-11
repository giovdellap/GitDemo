import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlotFactory } from '../../graphFactory/plotFactory';
import { models } from '../../model/models';
import { LinechartService } from '../../services/linechart.service';
import { NoSanitizePipe } from "../../utils/nosanitizerpipe";
import { MultipleLinechartComponent } from "../linechart/multiple-linechart/multiple-linechart.component";
import { SingleLinechartComponent } from "../linechart/single-linechart/single-linechart.component";

@Component({
  selector: 'app-linechart-container',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoSanitizePipe,
    CommonModule,
    MatRadioModule,
    SingleLinechartComponent,
    MultipleLinechartComponent,
    MatButtonModule,
    MatCardModule
],
  templateUrl: './linechart-container.component.html',
  styleUrl: './linechart-container.component.css'
})
export class LinechartContainerComponent implements OnInit{

  models = models.slice(1)
  // multiple = true => 4 grafici
  multiple = false;
  multipleEmitter = new BehaviorSubject<boolean>(this.multiple)
  multipleObservable: Observable<boolean>
  notMultipleEmitter = new BehaviorSubject<boolean>(!this.multiple)
  notMultipleObservable: Observable<boolean>


  //FILTER CONTROL
  xAxisOptions = ['satisfaction', 'generations']
  xAxis: string = this.xAxisOptions[0]
  xAxisControl = new FormControl<string>(this.xAxis)

  yAxis: string = 'tokens'

  svgArray: any[] = [{}, {}, {}, {}]
  svg: any
  factory = new PlotFactory(700, 450)

  constructor(private linechart: LinechartService) {
    this.linechart.setYAxis(this.xAxis)
    this.multipleObservable = this.multipleEmitter.asObservable()
    this.notMultipleObservable = this.notMultipleEmitter.asObservable()
  }

  ngOnInit(): void {
    this.xAxisControl.valueChanges.subscribe((x: any) => {
      this.xAxis = x
      this.linechart.setYAxis(x)
    })
      }

  changeMultiple() {
    this.multiple = !this.multiple
    this.multipleEmitter.next(this.multiple)
    this.notMultipleEmitter.next(!this.multiple)
  }

}
