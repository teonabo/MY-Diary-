import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from '../shared/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  private authenticationSub: Subscription;
  userAthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userAthenticated = this.authService.getIsAuthenticated();
    this.authenticationSub = this.authService.getIsAuthenticated().subscribe(status => {
      this.userAthenticated = status;
    })
  }

  logout(){
    this.authService.logout();
  }

}