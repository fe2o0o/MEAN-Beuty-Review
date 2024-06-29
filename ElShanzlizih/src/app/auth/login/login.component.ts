import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _Router:Router,private _AuthService:AuthService , private _ToastrService:ToastrService){}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required])
  })

  handleLogin(form: FormGroup) {
    this._AuthService.login(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token)
        this._AuthService.userData.next(res.token)
        this._Router.navigate(['/home'])
      },
      error: (err) => {
        this._ToastrService.error(err.error.error,err.error.message)
      }
    })
  }
}
