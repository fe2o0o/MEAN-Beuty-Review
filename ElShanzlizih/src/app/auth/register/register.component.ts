import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _Router:Router,private _AuthService:AuthService , private _ToastrService:ToastrService){}
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null,[Validators.required])
  })

  handleRegister(form: FormGroup) {
    const data = form.value;
    try {
        this._AuthService.signup(data).subscribe({
      next: (res) => {
        this._ToastrService.success("Register Confirmed","Success")
        this._Router.navigate(['/account/login'])
      },
      error: (err) => {
        this._ToastrService.error(err.error.error , err.error.message)
      }
    })
    } catch (error) {
      console.log("error",error);

    }
  }
}
