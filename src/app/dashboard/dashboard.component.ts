import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = ""
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  withdrawalForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  })
  //to pass a variable to child
  acno: any

  lDate: any
  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    if(localStorage.getItem('currentUsername')){
    //fetch username from localstorage
    this.user = JSON.parse(localStorage.getItem('currentUsername') || '')

    }
    this.lDate = new Date()
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      alert('please login')
      this.router.navigateByUrl("")
    }
  }
  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if (this.depositForm.valid) {
      this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          alert(result.message)
        },
          result => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert('invalid form')
    }
  }



  withdrawal() {
    var acno = this.withdrawalForm.value.acno1
    var pswd = this.withdrawalForm.value.pswd1
    var amount = this.withdrawalForm.value.amount1
    if (this.withdrawalForm.valid) {
      this.ds.withdrawal(acno, pswd, amount)
        .subscribe((result: any) => {
          alert(result.message)
        },
          result => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert('invalid form')
    }
  }




  logout() {
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUsername')
    localStorage.removeItem('token')
    this.router.navigateByUrl("")
  } 

  //set acno from localStorage to acno variable
  deleteParent() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }


  cancel() {
    this.acno = ""
  }

  
  onDelete(event: any) {      
    // asynchronous
    this.ds.delete(event)
    .subscribe(
      (result:any)=>{
        alert(result.message)
        this.logout()
      },
      result=>{
        alert(result.error.message)
      }
    )
  }
}