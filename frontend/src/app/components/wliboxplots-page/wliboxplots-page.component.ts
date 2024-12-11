import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlotFactory } from '../../graphFactory/plotFactory';
import { models } from '../../model/models';
import { ApiService } from '../../services/api.service';
import { NoSanitizePipe } from '../../utils/nosanitizerpipe';

@Component({
  selector: 'app-wliboxplots-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoSanitizePipe
  ],
  templateUrl: './wliboxplots-page.component.html',
  styleUrl: './wliboxplots-page.component.css'
})
export class WliboxplotsPageComponent implements OnInit {

  optionControl = new FormControl()
  modelControl = new FormControl()

  options: string[] = ['satisfaction', 'generations']
  models = models
  svg: any

  factory = new PlotFactory(1200, 600)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0])
    this.modelControl.setValue(this.models[0])
    //this.factory.createSvg('scatter')
    console.log('oninit 1')
    this.getGraph(this.options[0], this.models[0])
    console.log('oninit 2')
    this.optionControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.modelControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.apiService.getObservable().subscribe(() => this.controlValueChanges())
  }

  controlValueChanges() {
    //this.factory.removeSvg('scatter')
    this.getGraph(this.optionControl.value, this.modelControl.value)
  }

  getGraph(option: string, model: string) {
    this.apiService.getBasicQueryNoCOunt(option, 'wli', model).subscribe(res => {
      //this.factory.createSvg('scatter')
      console.log('GET GRAPH 1')
      this.svg = this.factory.getWLIBoxplot(res, option).outerHTML
      console.log('GET GRAPH 2')
    })
  }
}
