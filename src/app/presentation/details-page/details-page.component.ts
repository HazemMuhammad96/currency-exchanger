import { Component } from "@angular/core";
import { DetailsPageData, DetailsPageService } from "./details-page.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-details-page",
    templateUrl: "./details-page.component.html",
    styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent {
    exchangeForm: FormGroup;
    detailsPageData: DetailsPageData;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private detailsPageService: DetailsPageService
    ) {
        const [from, to] = this.getDefaultCurrencies();

        this.detailsPageData = this.detailsPageService.pageData.value;
        this.exchangeForm = this.formBuilder.group({
            amount: 1,
            from,
            to,
        });
        this.onFormChange();
        this.detailsPageService.pageData.subscribe((data) => {
            this.detailsPageData = data;
        });
    }

    private getDefaultCurrencies() {
        const param =
            this.route.snapshot.paramMap.get("currencies") ?? "EUR-EGP";
        return param?.split("-").map((currency) => currency.toUpperCase());
    }

    get currenciesNames(): Array<string> {
        return this.detailsPageService.currenciesNames;
    }

    get baseCurrencyName(): string {
        return (
            this.detailsPageData.currencies.get(
                this.detailsPageData.baseCurrency
            )?.fullName ?? ""
        );
    }

    get toCurrencyName(): string {
        return (
            this.detailsPageData.currencies.get(this.detailsPageData.toCurrency)
                ?.fullName ?? ""
        );
    }

    onFormChange() {
        this.detailsPageService.listenToChange(
            this.exchangeForm.value.amount,
            this.exchangeForm.value.from,
            this.exchangeForm.value.to
        );
    }

    onSubmit() {
        this.detailsPageService.exchange(this.exchangeForm.value.amount);
    }
}
