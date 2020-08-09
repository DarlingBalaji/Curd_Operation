import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from '../service/common.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  Employee: any = [];
  model: any = {};

  constructor(  public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private service: CommonService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    // this.updateEmploye();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployees(id);
  }

  getEmployees(id){
    this.service.getEmployee('users/viewone', id).subscribe( dataupdata => {
      this.Employee = dataupdata;
      this.model.EmployeeName = this.Employee.EmployeeName
      this.model.EmployeeCode = this.Employee.EmployeeCode
      // console.log(this.model.EmployeeName)
      // console.log("data", this.Employee)
    })
  }

  // updateEmploye(){

  // }
  onSubmit(){
    // this.submitted = true;
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        var data = {
          "EmployeeName": this.model.EmployeeName,
          "EmployeeCode": this.model.EmployeeCode,
        }
        this.service.updateEmployee(id, data).subscribe(res => {
          if(res.status == true) {
            this.toastr.clear();
            this.toastr.success(res.message,'Updated Successfully!!!');
            this.router.navigateByUrl('/View-Employee');
            // this.router.navigate(['/View-Employee']);
          }
          else {
            this.toastr.clear();
            this.toastr.error(res.message,'Oops');
          }
            // console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
      else{
        alert("SomeThing Went Wrong")
      }
    }
}
