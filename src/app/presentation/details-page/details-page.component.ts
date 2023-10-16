import { Component, OnDestroy } from "@angular/core";
import { DetailsPageData, DetailsPageService } from "./details-page.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "app-details-page",
    templateUrl: "./details-page.component.html",
    styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent implements OnDestroy {
    exchangeForm: FormGroup;
    detailsPageData: DetailsPageData;
    routerSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private detailsPageService: DetailsPageService
    ) {
        this.detailsPageData = this.detailsPageService.pageData.value;
        this.exchangeForm = this.formBuilder.group({
            amount: 1,
            from: "",
            to: "",
        });
        this.routerSubscription = this.getDefaultCurrencies();
        this.detailsPageService.pageData.subscribe((data) => {
            this.detailsPageData = data;
        });
    }

    private getDefaultCurrencies() {
        return this.route.params.subscribe((params) => {
            const currenciesParam: string = params["currencies"] ?? "EUR-EGP";
            const [from, to] = currenciesParam
                ?.split("-")
                .map((currency) => currency.toUpperCase());
            this.exchangeForm = this.formBuilder.group({
                amount: 1,
                from,
                to,
            });
            this.onFormChange();
        });
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

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}
