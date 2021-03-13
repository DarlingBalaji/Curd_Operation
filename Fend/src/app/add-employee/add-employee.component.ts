import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../service/common.service';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpEventType  } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})


export class AddEmployeeComponent implements OnInit {
  model:any = {};
  constructor(private toastr: ToastrService, private http: HttpClient, private service : CommonService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    var datas = {
      "EmployeeName": this.model.EmployeeName,
      "EmployeeCode": this.model.EmployeeCode,
    }
    this.service.postfunction('users/register',datas).subscribe( res => {
      if(res.status == true) {
        this.toastr.clear();
        this.toastr.success(res.message,'Account Created Successfully!!!');
        this.router.navigate(['/View-Employee']);
      }
      else {
        this.toastr.clear();
        this.toastr.error(res.message,'Oops');
      }
    })
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
