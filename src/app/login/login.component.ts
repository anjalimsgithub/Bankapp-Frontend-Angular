import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({//decarators
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //properties
  aim = 'Your perfect banking partner'
  account = 'Enter account number here'
  acno = ""//to hold user accountnumber
  pswd = ""//to hold user password
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
 

  //constructor ->dependency injection
  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }//initiate object

  //life cycle 
  ngOnInit(): void {
  }
  //user defined functions



  //login
  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    if (this.loginForm.valid) {
            //call login in dataservice-asynchronous
      this.ds.login(acno, pswd)
      .subscribe((result: any) => {
        localStorage.setItem('currentUsername',JSON.stringify(result.currentUsername))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))
        alert(result.message)
        this.router.navigateByUrl("dashboard")
      },
      result=>{
        alert(result.error.message)

      }
      )
    }
    else {
      alert('invalid form')
    }
  }
}
