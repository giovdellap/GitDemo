import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PlotFactory } from '../../../graphFactory/plotFactory';
import { ApiService } from '../../../services/api.service';
import { WeekdayService } from '../../../services/weekday.service';
import { NoSanitizePipe } from '../../../utils/nosanitizerpipe';

@Component({
  selector: 'app-single-weekday',
  standalone: true,
  imports: [
    NoSanitizePipe,
    MatCardModule
  ],
  templateUrl: './single-weekday.component.html',
  styleUrl: './single-weekday.component.css'
})
export class SingleWeekdayComponent {

  svg: any
  factory = new PlotFactory(1200, 700)

  constructor(
    private apiService: ApiService,
    private weekdayService: WeekdayService
  ) {
    console.log('MULTIPLE COMPONENT')

    this.apiService.getBasicRequestQueryNoCount('time').subscribe( res => {
      this.weekdayService.insertArray(res)
      this.weekdayService.generateSingleLinechartArray()
      this.svg = this.factory.getWeekdayLineChart(this.weekdayService.singleArray).outerHTML
    })

  }
}
