import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HomePageData, HomePageService } from "./home-page.service";

@Component({
    selector: "app-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
    providers: [HomePageService],
})
export class HomePageComponent {
    exchangeForm: FormGroup;
    homePageData: HomePageData;

    constructor(
        private formBuilder: FormBuilder,
        private homePageService: HomePageService
    ) {
        this.homePageData = this.homePageService.homePageData.value;
        this.exchangeForm = this.formBuilder.group({
            amount: undefined,
            from: "EUR",
            to: "USD",
        });
        this.homePageService.homePageData.subscribe((data) => {
            this.homePageData = data;
        });
    }

    get currenciesNames(): Array<string> {
        return this.homePageService.currenciesNames;
    }

    get toCurrencyName(): string {
        return (
            this.homePageData.currencies.get(this.homePageData.toCurrency)
                ?.fullName ?? ""
        );
    }

    onFormChange() {
        this.homePageService.listenToChange(
            this.exchangeForm.value.amount,
            this.exchangeForm.value.from,
            this.exchangeForm.value.to
        );
    }

    onSubmit() {
        this.homePageService.exchange(this.exchangeForm.value.amount);
    }
}
