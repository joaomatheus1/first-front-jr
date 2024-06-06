import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initials-icon',
  templateUrl: './initials-icon.component.html',
  styleUrls: ['./initials-icon.component.scss']
})
export class InitialsIconComponent {
  @Input() firstName!: string;
  @Input() lastName!: string;

  constructor() {}

  pickFirstChar(name: string) {
    return name.toUpperCase().charAt(0)
  }

  setName() {
    return `${this.pickFirstChar(this.firstName)}${this.pickFirstChar(this.lastName)}`
  }
}
