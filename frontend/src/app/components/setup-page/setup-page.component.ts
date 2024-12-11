import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { setupBothResponse } from '../../model/queryresponses/setupResponse';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-setup-page',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './setup-page.component.html',
  styleUrl: './setup-page.component.css'
})
export class SetupPageComponent {

  status = {
    initialize: {
      cassandra: '',
      influx: ''
    },
    populate: {
      cassandra: '',
      influx: ''
    }
  }

  constructor(private apiService: ApiService) {}

  initializeDB(db: string) {
    this.apiService.initializeDB(db).subscribe((res: any) => {
      let status = 'FAIL'
      if (res.text === 'OK') {
        status = res.text
      }
      if (db === 'cassandra') {
        this.status.initialize.cassandra = status
      } else {
        this.status.initialize.influx = status
      }
    })
  }

  insertOneMonth(db: string) {
    this.apiService.insertOneMonth(db).subscribe((res: any) => {
      let status = 'FAIL'
      if (res.counter !== undefined) {
        status = 'LOGITEMS: ' + res.counter
      }
      if (db === 'cassandra') {
        this.status.populate.cassandra = status
      } else {
        this.status.populate.influx = status
      }
    })
  }

  setupBoth() {
    this.apiService.setupBoth().subscribe((res: setupBothResponse) => {
      this.status.initialize.cassandra = "OK"
      this.status.initialize.influx = "OK"
      this.status.populate.cassandra = "LOGITEMS: " + res.cassandra
      this.status.populate.influx = "LOGITEMS: " + res.influx
    })
  }
}
