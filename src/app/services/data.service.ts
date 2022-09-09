import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global headers
const Options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }



  //register
  register(acno: any, password: any, username: any) {
    const data = {
      acno,
      password,
      username
    }
    //register API call to server-asynchronous
    return this.http.post('http://localhost:3000/register', data)
  }

  //login
  login(acno: any, pswd: any) {
    const data = {
      acno,
      pswd
    }
    //register API call to server-asynchronous
    return this.http.post('http://localhost:3000/login', data)

  }

  //to get headers with token
  getOption() {
    //fetch the token from local storage
    const token = JSON.parse(localStorage.getItem('token') || '')
    //to get headers,create an object for HttpHeaders
    let headers = new HttpHeaders()
    //append token inside header
    if (token) {
      headers = headers.append('x-token', token)
      //implement overload
      Options.headers = headers

    }
    return Options
  }


  //deposit
  deposit(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt
    }
    //deposit API call to server-asynchronous
    return this.http.post('http://localhost:3000/deposit', data, this.getOption())
  }


  //withdrawal
  withdrawal(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt
    }
    //withdrawal API call to server-asynchronous
    return this.http.post('http://localhost:3000/withdrawal', data, this.getOption())



  }

  //transaction history
  getTransaction(acno: any) {
    const data = {
      acno
    }
    return this.http.post('http://localhost:3000/getTransaction', data, this.getOption())
  }


  //delete API
  delete(acno: any) {
    return this.http.delete('http://localhost:3000/onDelete/' + acno)
  }
}

