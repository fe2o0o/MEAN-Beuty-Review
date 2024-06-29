import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() != null ) {
          this.isLogged=true
        } else {
          this.isLogged=false
        }
      }
    })
  }



  logOut() {
    this._AuthService.logOut()
  }

  isLogged: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let navBar = document.getElementById('nav') as HTMLElement;
    if (window.pageYOffset > navBar.clientHeight) {
      navBar.classList.replace('bg-body', 'bg-head')
      navBar.classList.add('shadow')
    } else {
      navBar.classList.replace('bg-head', 'bg-body' )
      navBar.classList.remove('shadow')
    }
  }
}
