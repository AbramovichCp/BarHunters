import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // private navToggle: boolean = false;

  constructor() { }

  ngOnInit() { }

  // toggleNav() {
  //   this.navToggle = !this.navToggle;
  // }

  // scrollToBottom(className: string): void {
  //   const elementList = document.querySelectorAll(className);
  //   const element = elementList[0] as HTMLElement;
  //   element.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //     inline: 'nearest',
  //   });
  // }
}
