import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { generateUniqueId } from 'src/utils/functions';
import { ICoutries, IPerfil, IUser } from 'src/utils/user';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() userData!: IUser;
  @Input() users!:IUser[];
  @Input() isEditing: boolean = false;
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
      id: new FormControl(generateUniqueId()),
      firstName: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      flag: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfilAcess: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      contactPreferential: new FormControl(''),
    });
    this.mask = this.countries[0].mask;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && changes['userData'].currentValue) {
      this.editForm(changes['userData'].currentValue);
    }
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
    if(this.isEditing) {
      this.setEditUser(formData);
      this.isEditing = false;
      alert('Usuário editado com sucesso');
      this.clearForm();
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

  setEditUser(formData:any) {
    this.users.forEach(user => {
      if(user.id === this.userData.id) {
        user.id = formData.value.id
        user.fullName = formData.value.fullName
        user.email = formData.value.email
        user.lastName = formData.value.lastName
        user.status = 'Ativo'
        user.firstName = formData.value.firstName
        user.flag = formData.value.flag
        user.phone = formData.value.phone
        user.perfilAcess = formData.value.perfilAcess
        user.language = formData.value.language
        user.contactPreferential= formData.value.contactPreferential
        user.fullName = `${this.setFullName(formData.value.firstName)} ${this.setFullName(formData.value.lastName)}`;
      }
    })
  }

  editForm(user: IUser) {
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      flag: user.flag,
      phone: user.phone,
      email: user.email,
      perfilAcess: user.perfilAcess,
      language: user.language,
      contactPreferential: user.contactPreferential
    })
  }


  onClose() {
    if (!this.userForm.touched) {
      this.close.emit()
    } else if (window.confirm('Deseja sair sem salvar?')) {
      this.clearForm();
    }
  }

}
