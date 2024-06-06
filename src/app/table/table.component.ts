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
      fullName: 'João Matheus',
      contactPreferential: 'email',
      creationDate: '04/06/2024',
      lastAcess: '06/06/2024 às 13:23h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'João',
      lastName: 'Matheus',
      language: '1',
      id: '0',
      status: 'Bloqueado',
      perfilAcess: ['AN'],
      flag: '0'
    },
    {
      fullName: 'João Matheus',
      contactPreferential: 'email',
      creationDate: '05/06/2024',
      lastAcess: '06/06/2024 às 13:22h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'João',
      lastName: 'Matheus',
      language: '1',
      id: '0',
      status: 'Bloqueado',
      perfilAcess: ['AN'],
      flag: '0'
    },
    {
      fullName: 'João Matheus',
      contactPreferential: 'email',
      creationDate: '06/06/2024',
      lastAcess: '06/06/2024 às 13:30h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'João',
      lastName: 'Matheus',
      language: '1',
      id: '0',
      status: 'Pendente',
      perfilAcess: ['AN'],
      flag: '0'
    },    {
      fullName: 'João Matheus',
      contactPreferential: 'email',
      creationDate: '07/06/2024',
      lastAcess: '06/06/2024 às 13:46h',
      phone: '81984659946',
      email: 'joao.matheeus1555@gmail.com',
      firstName: 'João',
      lastName: 'Matheus',
      language: '1',
      id: '0',
      status: 'Pendente',
      perfilAcess: ['AN'],
      flag: '0'
    }
  ];
  nameFiltered: string = '';
  selectedStatus: string = '';
  dataFiltered: IUser[] = [];
  loading: boolean = false;
  isModalVisible = false;

  constructor() {
    this.dataFiltered = [...this.users];
  }

  setUser(user: IUser) {
    this.users.push(user)
    this.filteringTable()
  }

  filteringTable() {
    this.dataFiltered = this.users.filter((user) => {
      const nameFiltered =
      user.fullName.toLowerCase().includes(this.nameFiltered.toLowerCase()) ||
        user.email.toLowerCase().includes(this.nameFiltered.toLowerCase());
        const statusFiltered =
        this.selectedStatus === '' || user.status === this.selectedStatus;
      return nameFiltered && statusFiltered;
    });
  }

  openModal() {
    this.isModalVisible = true;
  }

  onModalClose() {
    this.isModalVisible = false;
  }
}
