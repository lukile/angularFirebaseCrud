import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Employee} from '../shared/employee.model';
import {element} from 'protractor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    var datas = this.employeeService.getData();

    // Get datas from db and subscribe to it
    datas.snapshotChanges().subscribe(item => {
      this.employeeList = [];

      item.forEach(element => {
        var datasToJson = element.payload.toJSON();
        datasToJson["$key"] = element.key;
        this.employeeList.push(datasToJson as Employee);
      })
    })
  }

  onItemClick(employee: Employee) {
    // Create a copy of selected object inside selectedEmployee
      this.employeeService.selectedEmployee = Object.assign({}, employee);
  }

}
