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
  // filesToUpload: Array<File> = [];
  // fileData: File = null;
  // previewUrl:any = null;
  // fileUploadProgress: string = null;
  // uploadedFilePath: string = null;
  // data:any = {};
  
  constructor(private toastr: ToastrService, private http: HttpClient, private service : CommonService, private router: Router) { }

  ngOnInit() {
  }

  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }

  // preview() {
  //   // Show preview 
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();      
  //   reader.readAsDataURL(this.fileData); 
  //   reader.onload = (_event) => { 
  //     this.previewUrl = reader.result; 
  //   }
  // }
  
  // onUpload() {
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.http.post('url/to/your/api', formData).subscribe(res => {
  //       console.log(res);
  //       this.uploadedFilePath = res.data.filePath;
  //       alert('SUCCESS !!');
  //     }) 
  // }

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
