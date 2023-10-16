import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-currency-form",
    templateUrl: "./currency-form.component.html",
    styleUrls: ["./currency-form.component.scss"],
})
export class CurrencyFormComponent implements OnInit {
    @Input("formGroup") exchangeForm!: FormGroup;
    @Input() enabled: boolean = true;
    @Input() currencies: Array<string> = [];
    @Output("onSubmit") onSubmitEvent = new EventEmitter<void>();
    @Output("onChange") onChangeEvent = new EventEmitter<void>();

    ngOnInit(): void {
        this.exchangeForm.valueChanges.subscribe(() => {
            this.onChangeEvent.emit();
        });
    }

    onSubmit: () => void = () => {
        this.onSubmitEvent.emit();
    };
}
