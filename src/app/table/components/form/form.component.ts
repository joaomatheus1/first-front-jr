import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerfil } from 'src/utils/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  perfilDropdown: IPerfil[] = [
    { label: 'Supervisor', value: 'SUP' },
    { label: 'Analista', value: 'ANA' }
  ];
  selectedPerfil: string[] = [];
  userForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
      this.userForm = new FormGroup({
        id: new FormControl(''),
        nome: new FormControl('', Validators.required),
        sobrenome: new FormControl('', Validators.required),
        telefone: new FormControl(''),
        email: new FormControl('', Validators.required),
        perfil: new FormControl('', Validators.required),
        idioma: new FormControl('', Validators.required),
        contatoPreferencial: new FormControl('')
      })
  }
  submitForm(formData: any) {
    const date = new Date()
    formData.dataAtual = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
    formData.dataHoraAtual = `${formData.dataAtual} às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}h`;
    console.log(formData);
  }
}
