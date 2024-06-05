import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ValidationMessageModule } from "../shared/validation-mensage/validation-message.module";
import { AppComponent } from './app.component';
import { FormComponent } from './table/components/form/form.component';
import { ModalComponent } from './table/components/modal/modal.component';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        ModalComponent,
        FormComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        TableModule,
        DropdownModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectModule,
        BrowserAnimationsModule,
        ValidationMessageModule
    ]
})
export class AppModule { }
