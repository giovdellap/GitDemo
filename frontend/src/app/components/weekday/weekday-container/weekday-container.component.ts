import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable } from 'rxjs';
import { MultipleWeekdayComponent } from '../multiple-weekday/multiple-weekday.component';
import { SingleWeekdayComponent } from '../single-weekday/single-weekday.component';

@Component({
  selector: 'app-weekday-container',
  standalone: true,
  imports: [
    SingleWeekdayComponent,
    MultipleWeekdayComponent,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './weekday-container.component.html',
  styleUrl: './weekday-container.component.css'
})
export class WeekdayContainerComponent {

  multiple = false;
  multipleEmitter = new BehaviorSubject<boolean>(this.multiple)
  multipleObservable: Observable<boolean>

  constructor() {
    this.multipleObservable = this.multipleEmitter.asObservable()
  }

  changeMultiple() {
    this.multiple = !this.multiple
    this.multipleEmitter.next(this.multiple)
  }
}
