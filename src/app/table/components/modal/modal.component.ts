import { Component, OnInit } from '@angular/core';

interface IPerfil {
  label: string;
  value: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  perfil: IPerfil[] = [
    { label: 'Supervisor', value: 'SUP' },
    { label: 'Analista', value: 'ANA' }
  ];
  selectedPerfil: string[] = [];


  constructor() { console.log(this.selectedPerfil) }

  ngOnInit() {
  }

  submitForm(){

  }

}
