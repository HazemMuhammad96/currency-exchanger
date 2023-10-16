import { Component, Input } from "@angular/core";

@Component({
    selector: "app-exchange-result",
    templateUrl: "./exchange-result.component.html",
    styleUrls: ["./exchange-result.component.scss"],
})
export class ExchangeResultComponent {
    @Input("base-currency-short") baseCurrencyShortName: string = "";
    @Input("to-currency-short") toCurrencyShortName: string = "";
    @Input("to-currency-full") toCurrencyFullName: string = "";
    @Input("main-exchange") mainExchange: string = "";
    @Input("base-exchange") baseExchange: string = "";
}
