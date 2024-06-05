/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective, UntypedFormControl } from '@angular/forms';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { CUSTOM_ERRORS } from '../../utils/custom-errors';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.html',
  styleUrls: ['./validation-message.scss'],
})
export class ValidationMessageComponent implements OnInit, OnDestroy {
  @Input() className = '';

  public formControl!: UntypedFormControl;
  public message = '';
  public label = '';

  private eventFunction = () => this.handleValidators();
  private subscription = new Subscription();
  private input!: HTMLElement;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private elRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.getLabel();
  }

  getLabel() {
    setTimeout(() => {
      const arrEl = Array.from(this.elRef?.nativeElement?.parentElement?.children);
      const labelText = (arrEl.find((x: any) => x.tagName === 'LABEL') as HTMLElement)?.innerHTML || 'campo';
      let inputGroupChildren: any = (arrEl.find((x: any) => x.classList.contains('input-group')) as HTMLElement)?.children;
      let inputDropdownSearch: any = (arrEl.find((x: any) => x.tagName === 'APP-DROPDOWN-SEARCH') as HTMLElement)?.children;
      if (inputDropdownSearch)
        inputDropdownSearch = Array.from(inputDropdownSearch[0].children).find((x: any) => x.classList.contains('dropdown-search'));
      if (inputGroupChildren) inputGroupChildren = Array.from(inputGroupChildren);
      const inputEl = (inputGroupChildren || arrEl).find((x: any) => (x as HTMLElement).hasAttribute('formcontrolname')) as HTMLElement;
      if (inputEl) {
        this.formControl = this.formGroupDirective.control.get(inputEl.getAttribute('formcontrolname') || '') as UntypedFormControl;
        this.subscription = this.formControl?.statusChanges?.pipe(distinctUntilChanged()).subscribe(() => this.handleValidators());
        this.label = labelText;
        this.input = inputDropdownSearch || inputEl;
        this.handleMarkAsTouched();
        this.input.addEventListener('blur', this.eventFunction);
      } else
        throw new Error(
          'formControlName is missing. Make sure the component is inside an element with a class "form-group" and it has a child element with formControlName attribute!',
        );
    }, 0);
  }

  handleMarkAsTouched() {
    const callValidators = () => {
      this.handleValidators.apply(this);
    };
    const markAsTouched = this.formControl.markAsTouched;
    this.formControl.markAsTouched = function () {
      markAsTouched.apply(this);
      setTimeout(() => callValidators.apply(this));
    };
  }

  handleValidators() {
    this.handleShowClass();
    const formErrors = this.formControl.errors;
    let additionalErrorMessage = '';
    if (formErrors) {
      const errorKey = Object.keys(formErrors)[0];
      const customError = CUSTOM_ERRORS.find((error) => error.error === errorKey);
      if (errorKey === 'min' || errorKey === 'max') {
        additionalErrorMessage = formErrors[errorKey];
      } else additionalErrorMessage = this.label;
      if (customError) {
        this.message = customError.format(additionalErrorMessage, formErrors[errorKey]);
      }
    }
  }

  handleShowClass() {
    if (this.onTouchedAndDirty()) {
      const removeClass = this.formControl.valid ? 'is-invalid' : this.formControl.invalid ? 'is-valid' : '';
      const addClass = this.formControl.valid ? 'is-valid' : this.formControl.invalid ? 'is-invalid' : '';
      if (this.formControl.status === 'DISABLED') {
        this.input?.classList.remove('is-invalid');
        this.input?.classList.remove('is-valid');
      }
      if (removeClass) this.input?.classList.remove(removeClass);
      if (addClass) this.input?.classList.add(addClass);
    }
  }

  onTouchedAndDirty() {
    return this.formControl.touched && this.formControl.dirty;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.input?.removeEventListener('blur', this.eventFunction);
  }
}
