import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class Validator {

    public static checkNameDuplicated = (names: string[]): ValidatorFn | null => (control: AbstractControl): ValidationErrors | null => {
        const name = control.get('name');
        return names.includes(name?.value) ? { duplicated: true } : null;
    };
}