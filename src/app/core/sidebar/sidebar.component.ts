import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  addClass(event): void {
    event.target.className += 'showMenu';
  }

  removeClass(event): void {
    event.target.className = event.target.className.replace('removeMenu', '');
  }
  onActiveUrl() {
    if (this.router.url === '/operations' || this.router.url === '/screens' || this.router.url === '/screen-operation') {
      return "active";
    }
  }

}
