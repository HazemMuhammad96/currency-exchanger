import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-detailed-currency-form",
    templateUrl: "./detailed-currency-form.component.html",
    styleUrls: ["./detailed-currency-form.component.scss"],
})
export class DetailedCurrencyFormComponent implements OnInit {
    @Input("formGroup") exchangeForm!: FormGroup;
    @Input("default-from-currency") defaultFromCurrency: string = "";
    @Input("default-to-currency") defaultToCurrency: string = "";
    @Input() enabled: boolean = true;
    @Input() currencies: Array<string> = [];
    @Output("onSubmit") onSubmitEvent = new EventEmitter<void>();
    @Output("onChange") onChangeEvent = new EventEmitter<void>();
@Input() title: string = "";
    ngOnInit(): void {
        this.exchangeForm.valueChanges.subscribe(() => {
            this.onChangeEvent.emit();
        });
    }

    onSubmit: () => void = () => {
        this.onSubmitEvent.emit();
    };
}
