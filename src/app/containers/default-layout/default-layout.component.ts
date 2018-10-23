import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';

import { Router } from '@angular/router';

import { UserLoginService } from '../../views/login/service/user-login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private router: Router,private userLoginService:UserLoginService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  public logout() {
    this.userLoginService.logout();
    this.router.navigate(['/', 'login']);

  }
}
