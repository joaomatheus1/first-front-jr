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
      name: 'João Matheus',
      email: 'joasd@gmail.com',
      status: 'Ativo',
      creationDate: '10/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'Carlos',
      email: 'funfun@gmail.com',
      status: 'Pendente',
      creationDate: '12/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'Carlos',
      email: 'fasddn@gmail.com',
      status: 'Ativo',
      creationDate: '10/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'José',
      email: 'fonfon@gmail.com',
      status: 'Bloqueado',
      creationDate: '11/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'João Matheus',
      email: 'joasd@gmail.com',
      status: 'Ativo',
      creationDate: '10/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'Carlos',
      email: 'funfun@gmail.com',
      status: 'Pendente',
      creationDate: '12/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'Carlos',
      email: 'fasddn@gmail.com',
      status: 'Ativo',
      creationDate: '10/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'José',
      email: 'fonfon@gmail.com',
      status: 'Bloqueado',
      creationDate: '11/10/2020',
      lastAcess: '10/10/2020',
    },
  ];
  nameFiltered: string = '';
  selectedStatus: string = '';
  dataFiltered: IUser[] = [];
  loading: boolean = false;
  isModalVisible = false;

  constructor() {
    this.dataFiltered = [...this.users];
  }

  filteringTable() {
    this.dataFiltered = this.users.filter((user) => {
      const nameFiltered =
        user.name.toLowerCase().includes(this.nameFiltered.toLowerCase()) ||
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
