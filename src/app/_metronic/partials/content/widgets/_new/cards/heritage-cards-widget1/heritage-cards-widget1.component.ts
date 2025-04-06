import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heritage-cards-widget1',
  templateUrl: './heritage-cards-widget1.component.html',
  styleUrl: './heritage-cards-widget1.component.scss',
})
export class HeritageCardsWidget1Component {
  @Input() cssClass: string = '';

  constructor() {}

  ngOnInit(): void {}
}
