import { Component } from '@angular/core';

@Component({
  selector: 'app-adding-section',
  templateUrl: './adding-section.component.html',
  styleUrl: './adding-section.component.scss'
})
export class AddingSectionComponent {
showSavingSection:boolean=false;

show(){
  this.showSavingSection=true;
}
hide(){
  this.showSavingSection=false;
}
}
