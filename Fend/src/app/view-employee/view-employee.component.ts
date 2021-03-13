import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  
  Employee:any = [];

  constructor(private service : CommonService) { }             
  
  ngOnInit() {
    this.readEmployee();
  }

  readEmployee(){
    this.service.getfunction('users/View').subscribe((data) => {
      // console.log("data", data)
     this.Employee = data;
    //  console.log("Employee", this.Employee)
    })
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure dood?')) {
        this.service.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }


}
