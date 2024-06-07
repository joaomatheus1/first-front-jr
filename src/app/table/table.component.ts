import { Component } from '@angular/core';
import { IUser } from 'src/utils/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: []
})
export class TableComponent {
  statusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Ativo', value: 'Ativo' },
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Bloqueado', value: 'Bloqueado' },
  ];
  users: IUser[] = [
    {
      id: '0',
      fullName: 'João Matheus',
      contactPreferential: 'email',
      creationDate: '04/06/2024',
      lastAcess: '06/06/2024 às 13:23h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'João',
      lastName: 'Matheus',
      language: '1',
      status: 'Bloqueado',
      perfilAcess: ['AN'],
      flag: '0'
    },
    {
      id: '1',
      fullName: 'Carlos Carlos',
      contactPreferential: 'email',
      creationDate: '05/06/2024',
      lastAcess: '06/06/2024 às 13:22h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'Carlos',
      lastName: 'Carlos',
      language: '1',
      status: 'Bloqueado',
      perfilAcess: ['AN'],
      flag: '0'
      },
      {
        id: '4',
        fullName: 'André Souza',
        contactPreferential: 'email',
        creationDate: '17/06/2024',
        lastAcess: '17/06/2024 às 18:46h',
        phone: '81984659946',
        email: 'andré@gmail.com',
        firstName: 'Julio',
        lastName: 'Julio',
        language: '1',
        status: 'Ativo',
        perfilAcess: ['AN'],
        flag: '0'
      },
      {
      id: '2',
      fullName: 'Felipe Felipe',
      contactPreferential: 'email',
      creationDate: '06/06/2024',
      lastAcess: '06/06/2024 às 13:30h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'Felipe',
      lastName: 'Felipe',
      language: '1',
      status: 'Pendente',
      perfilAcess: ['AN'],
      flag: '0'
    },    {
      id: '3',
      fullName: 'Julio Julio',
      contactPreferential: 'email',
      creationDate: '07/06/2024',
      lastAcess: '06/06/2024 às 13:46h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'Julio',
      lastName: 'Julio',
      language: '1',
      status: 'Pendente',
      perfilAcess: ['AN'],
      flag: '0'
    },
  ];
  nameFiltered: string = '';
  selectedStatus: string = '';
  dataFiltered: IUser[] = [];
  loading: boolean = false;
  isModalVisible = false;
  userData!: IUser;
  isEditing: boolean = false;

  constructor() {
    this.dataFiltered = [...this.users];
  }

  setUser(user: IUser) {
    this.users.push(user)
    this.filteringTable()
  }

  filteringTable() {
    this.dataFiltered = this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.nameFiltered.toLowerCase()) ||
      user.email.toLowerCase().includes(this.nameFiltered.toLowerCase())
    );

    if (this.selectedStatus !== '') {
      this.dataFiltered = this.dataFiltered.filter(user => user.status === this.selectedStatus);
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  onModalClose() {
    this.isModalVisible = false;
  }

  edit(user: IUser) {
    this.isEditing = true;
    this.userData = user;
    this.openModal();
  }

  delete(user: any) {
    this.users = this.users.filter(el => el.id !== user.id);
    this.filteringTable();
  }
}
