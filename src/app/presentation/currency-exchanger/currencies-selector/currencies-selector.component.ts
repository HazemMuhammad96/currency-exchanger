import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-currencies-selector",
    templateUrl: "./currencies-selector.component.html",
    styleUrls: ["./currencies-selector.component.scss"],
})
export class CurrenciesSelectorComponent {
    @Input("direction") direction: "uni" | "bi" = "bi";
    @Input("formGroup") formGroup!: FormGroup;
    @Input() currencies: Array<string> = [];
    @Input("default-from-currency") defaultFromCurrency: string = "EUR";
    @Input("default-to-currency") defaultToCurrency: string = "USD";

    switchCurrencies() {
        if (this.direction === "uni") return;
        const from = this.formGroup.get("from")?.value;
        const to = this.formGroup.get("to")?.value;
        this.formGroup.get("from")?.setValue(to);
        this.formGroup.get("to")?.setValue(from);
    }
}
