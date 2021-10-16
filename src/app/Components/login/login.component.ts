import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { from } from 'rxjs'
import { AuthenticationService , TokenPayLoad } from '../../Services/authentication.service'
import Swal from 'sweetalert2'
import { ValidationService } from 'src/app/Services/validation.service'
import { FlashMessagesService } from 'angular2-flash-messages'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
    email: string
    password: string
  

  constructor(private val:ValidationService,private flash:FlashMessagesService,public auth: AuthenticationService , private router: Router) { }




  login() {

    const credentials = {
      email:this.email,
      password:this.password
    }

    if(!this.val.validatingRegister2(credentials)){
      console.log('fill all')
      this.flash.show('*** Please fill all the fields ***', {cssClass:'alert-danger',timeout:3000})

      return false
    }
    if(!this.val.validatingEmail(credentials.email)){
      console.log('invalid email')
      this.flash.show('*** Entered Email is invalid ***', {cssClass:'alert-danger',timeout:3000})
      
      return false
    }

    console.log(this.email+' & '+this.password)
    
    this.auth.login(credentials).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard')
      },
      err => {
        console.error(err);
        alert('*** Sign in failed ***')
        
      }
    )

    //
    



    //


    







  }


  ngOnInit(): void {
    this.exform = new FormGroup ({
      'email': new FormControl(null,[Validators.required,Validators.email])
    })
  }

  exform: FormGroup;

}
