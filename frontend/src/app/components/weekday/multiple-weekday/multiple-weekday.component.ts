import { Component } from '@angular/core';
import { GraphFactory } from '../../../graphFactory/graphfactory';
import { ApiService } from '../../../services/api.service';
import { WeekdayService } from '../../../services/weekday.service';
import { weekdayNames } from '../../../utils/weekDayUtils';

@Component({
  selector: 'app-multiple-weekday',
  standalone: true,
  imports: [],
  templateUrl: './multiple-weekday.component.html',
  styleUrl: './multiple-weekday.component.css'
})
export class MultipleWeekdayComponent {

  titleArray = weekdayNames

  factoryArray: GraphFactory[] = []

  constructor(
    private apiService: ApiService,
    private weekdayService: WeekdayService
  ) {
    console.log('MULTIPLE COMPONENT')

    this.apiService.getBasicRequestQueryNoCount('time').subscribe( res => {
      console.log(res)
      this.weekdayService.insertArray(res)
      let minDate = new Date()
      minDate.setHours(0, 0, 0)
      let maxDate = new Date()
      maxDate.setHours(23, 59, 59)
      this.createAll([minDate, maxDate])
    })

  }

  createAll(xDomain: Date[]) {
    for (let i = 0; i < 7; i++) {
      this.factoryArray.push(new GraphFactory(500, 350))
      let id = 'scatter' + i
      this.factoryArray[i].createSvg(id)
      this.factoryArray[i].addXAxis('time', xDomain)
      this.factoryArray[i].addYAxis('linear', [0, 160])
      this.factoryArray[i].colorGrid()
      this.factoryArray[i].addXAxisTitle('daytime')
      this.factoryArray[i].addYAxisTitle('loading time')
      this.factoryArray[i].addSimpleScatterplotDots(this.weekdayService.getWeekDay(i), 'date', 'loading_time', 1)

    }
  }

  removeAll() {
    for (let i = 0; i < 7; i++) {
      let id = 'scatter' + i
      this.factoryArray[i].removeSvg(id)
    }
  }
}
