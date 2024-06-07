import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerfil, IUser } from 'src/utils/user';

interface ICoutries {
  name: string;
  code: string;
  flag: string;
  mask: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() setUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  perfilDropdown: IPerfil[] = [
    { label: 'Supervisor', value: 'SUP' },
    { label: 'Analista', value: 'ANA' },
    ];
  selectedPerfil: string[] = [];
  userForm!: FormGroup;
  countries: ICoutries[];
  selectedCountry: any;
  mask: any;

  constructor() {
    this.countries = [
      { name: 'Brasil', code: 'BR', flag: '../../../../assets/brasil.png', mask: '(00) 0 0000-0000' },
      { name: 'Estados Unidos', code: 'US', flag: '../../../../assets/estados-unidos.png', mask: '(000) 000-0000' },
      { name: 'Espanha', code: 'ES', flag: '../../../../assets/espanha.png', mask: '00 000 00 00' }
    ];
  }

  setMask() {
    return this.mask = this.selectedCountry.mask;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      flag: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfilAcess: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      contactPreferential: new FormControl(''),
    });
    this.mask = this.countries[0].mask;
  }

  clearForm() {
    const formControls = this.userForm.controls;
    Object.keys(formControls).forEach((key) => {
      const elements = document.querySelectorAll(`[formControlName=${key}]`);
      elements.forEach((element) => {
        element.classList.remove('is-invalid', 'is-valid');
      });
    });
    this.mask = this.countries[0].mask
    this.userForm.reset();
    this.isVisible = false;
    this.close.emit();
  }

  setFullName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  submitForm(formData: any) {
    if (formData.invalid) {
      return;
    }
    const date = new Date();
    formData.value.creationDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
    formData.value.lastAcess = `${formData.value.creationDate} às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}h`;
    formData.value.fullName = `${this.setFullName(formData.value.firstName)} ${this.setFullName(formData.value.lastName)}`;
    formData.value.status = "Ativo";
    this.setUser.emit(formData.value);
    alert("Convite enviado com sucesso");
    this.clearForm();
  }


  onClose() {
    if (!this.userForm.touched) {
      this.close.emit()
    } else if (window.confirm('Deseja sair sem salvar?')) {
      this.clearForm();
    }
  }

}
