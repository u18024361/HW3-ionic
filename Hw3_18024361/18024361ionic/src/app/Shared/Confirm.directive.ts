import { Interpolation } from "@angular/compiler";
import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
@Directive({
    selector: '[appConfirmEqualValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting:Confirm,
        multi: true
    }]
})
export class Confirm implements Validator{
@Input() appConfirmEqualValidator: string 
validate(control: AbstractControl):{[key:string]:any | null} {
const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
if(controlToCompare && controlToCompare.value !== control.value){
    return{'notEqual': true};
}
return null;
}
}