import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hn-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    title: string = 'Hacker News';
}
