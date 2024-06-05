import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './validation-message.component';

@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ValidationMessageComponent],
})
export class ValidationMessageModule {}
