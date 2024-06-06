import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerfil, IUser } from 'src/utils/user';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() setUser: EventEmitter<IUser> = new EventEmitter<IUser>();
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
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfilAcess: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      contactPreferential: new FormControl(''),
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

  setFullName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  submitForm(formData: any) {
    if(formData.invalid) {
      return;
    }
    const date = new Date();
    formData.value.creationDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
    formData.value.lastAcess = `${formData.value.creationDate} às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}h`;
    formData.value.fullName = `${this.setFullName(formData.value.firstName)} ${this.setFullName(formData.value.lastName)}`;
    formData.value.status = "Ativo"; //Qual quer usuário criado pelo formulário vai ser setado como ativo.
    this.setUser.emit(formData.value);
    alert("Convite enviado com sucesso");
    this.clearForm();
  }
  onClose() {
    if (window.confirm('Deseja sair sem salvar?')) {
      this.clearForm();
    }
  }

}
