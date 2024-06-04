import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  users: any[] = [
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
      status: 'Ativo',
      creationDate: '10/10/2020',
      lastAcess: '10/10/2020',
    },
    {
      name: 'José',
      email: 'fonfon@gmail.com',
      status: 'Ativo',
      creationDate: '10/10/2020',
      lastAcess: '10/10/2020',
    },
  ];
  nameFiltered: string = '';
  constructor() {}

  dataFiltered = [...this.users];

  filteringTable() {
    if (this.nameFiltered.trim().toLowerCase()) {
      this.dataFiltered = this.users.filter(
        (data) =>
          data.name.toLowerCase().includes(this.nameFiltered) ||
          data.email.toLowerCase().includes(this.nameFiltered)
      );
    } else {
      this.dataFiltered = [...this.users];
    }
  }
}
