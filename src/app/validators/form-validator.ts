import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidator {

    static validateNotWhitespaces(control : FormControl): ValidationErrors | null  {
        if(control.value.trim().length === 0){
            return { 'notWhitespaces': true };
        }else{
            return null;
        }
    }
}
