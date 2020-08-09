import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "src/app/model/employee";


@Component({
  selector: 'app-view-one',
  templateUrl: './view-one.component.html',
  styleUrls: ['./view-one.component.scss']
})



export class ViewOneComponent implements OnInit {

  Employee: any = [];
  Emp: any = [];
  // employeeData: Employee[];

  

  constructor(private service : CommonService,  private actRoute: ActivatedRoute,) { }

  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployees(id);
  }

  getEmployees(id) {
    console.log("ID", id)
    this.service.getEmployee('users/viewone', id).subscribe(data => {
      this.Employee = data;
      console.log("Employee", this.Employee)
      if(id = this.Employee._id){
        this.Emp = this.Employee
      }
    });
  }

}
