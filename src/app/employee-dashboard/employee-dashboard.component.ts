import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EmployeeModel } from "./employee.model";
import { ApiService } from "../service/api.service";
// import { DeviceTokenService } from '../service/device-token.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  
  formValue !: FormGroup;
  employeeModelObject: EmployeeModel = new EmployeeModel();
  employeesData !: any;
  showBtnAdd: boolean = true;
  showBtnUpdate: boolean = true;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    // this.deviceTokenService.setDeviceToken("hiankityadav");
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      mobileNumber: [''],
     
    })

    formValue: FormGroup;
    this.formValue=new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'emailId': new FormControl('', [Validators.required, Validators.email]),
      'mobileNumber': new FormControl(
        null,
         [Validators.required, 
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.maxLength(10)]),

    });

    // this.deviceTokenService.getDeviceToken()

    this.getAllEmployees()
  }

  onAddEmployee() {
    this.formValue.reset();
    this.showBtnAdd = true;
    this.showBtnUpdate = false;
  }

  click_postEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.emailId = this.formValue.value.emailId;
    this.employeeModelObject.mobileNumber = this.formValue.value.mobileNumber;
    

    this.apiService.postEmployee(this.employeeModelObject).subscribe(res => {
      console.log(res);
       alert("Employee Added.")
      this.formValue.reset();
      this.fn_close_model()
      this.getAllEmployees()
    }, error => {
      alert("error adding record.")
    })
  }

  getAllEmployees() {
    this.apiService.getEmployee().subscribe(res => {
      console.log(res);
      
      this.employeesData = res
      
    }, error => {
      alert("error getting record.")
    })
  }

  deleteEmployee(row: any) {
    this.apiService.deleteEmployee(row.id).subscribe(res => {
      console.log(res);
      alert("Deleted..")
      this.getAllEmployees()
    }, error => {
      alert("error deleting record.")
    })
  }

  editEmployee(row: any) {
    this.showBtnAdd = false;
    this.showBtnUpdate = true;

    this.employeeModelObject.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    
  }

  updateEmployee() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.emailId = this.formValue.value.emailId;
    this.employeeModelObject.mobileNumber = this.formValue.value.mobileNumber;
   
    this.apiService.updateEmployee(this.employeeModelObject, this.employeeModelObject.id).subscribe(res => {
      console.log(res)
      alert("Updated Successfully...!")
      this.fn_close_model()
      this.getAllEmployees()
      
    }, error => {
      console.log('error editing record.')
    })
  }

  fn_close_model() {
    let btn_çancel = document.getElementById('btn_çancel')
    btn_çancel?.click();
  }
  get firstName(){
    return this.formValue.get('firstName')
  }

  get lastName(){
    return this.formValue.get('lastName')
  }
  get emailId(){
    return this.formValue.get('emailId')
  }
  get mobileNumber(){
    return this.formValue.get('mobileNumber')
  }

 
}
