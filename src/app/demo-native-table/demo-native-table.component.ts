import { ApiConfig } from './../../../projects/native-table/src/lib/api-config.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-native-table',
  templateUrl: './demo-native-table.component.html',
  styleUrls: ['./demo-native-table.component.scss']
})
export class DemoNativeTableComponent implements OnInit {
 config: ApiConfig = {
   getApi: 'http://opendata.neuron.az/DispatcherRest/api/post/Permission/Applications/GetApplicationList'
 };
  constructor() { }

  ngOnInit() {
  }

}
