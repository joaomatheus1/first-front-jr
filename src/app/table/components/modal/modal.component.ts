import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerfil } from 'src/utils/user';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  perfilDropdown: IPerfil[] = [
    { label: 'Supervisor', value: 'SUP' },
    { label: 'Analista', value: 'ANA' },
  ];
  selectedPerfil: string[] = [];
  userForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      telefone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfil: new FormControl('', Validators.required),
      idioma: new FormControl('', Validators.required),
      contatoPreferencial: new FormControl(''),
    });
  }

  clearForm() {
    const formControls = this.userForm.controls;
    Object.keys(formControls).forEach((key) => {
      const elements = document.querySelectorAll(`[formControlName=${key}]`);
      elements.forEach((element) => {
        element.classList.remove('is-invalid', 'is-valid');
      });
    });
    this.userForm.reset();
    this.isVisible = false;
    this.close.emit();
  }

  submitForm(formData: any) {
    const date = new Date();
    formData.dataAtual = `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getUTCFullYear()}`;
    formData.dataHoraAtual = `${formData.dataAtual} às ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}h`;
    console.log(formData);
    alert("Usuário cadastrado !");
    this.clearForm();
  }
  onClose() {
    if (window.confirm('Deseja sair sem salvar?')) {
      this.clearForm();
    }
  }

}
