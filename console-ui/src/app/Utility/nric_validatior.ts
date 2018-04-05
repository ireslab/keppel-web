import { AbstractControl } from '@angular/forms';
import { utilityClass } from '../Utility/utility.class'

export function ValidateNric(control: AbstractControl) {
    let nricValue = utilityClass.isValidNric(control.value);
    if (nricValue == false) {
        return { validNric: true };
    } else {
        return null;
    }
}