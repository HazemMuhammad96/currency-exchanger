import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import CurrencyRepository from "../../data/currency-repository";
import exchangeRateUseCase from "../../domain/exchange-rate-usecase";
import ExchangePopularCurrenciesUseCase from "../../domain/exchange-popular-currencies-usecase";

@Component({
    selector: "app-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
    frequentCurrencies = Array.from(
        { length: 9 },
        (_: any, i: number) => i + 1
    );

    constructor(httpClient: HttpClient) {
        const currencyRepository = new CurrencyRepository(httpClient);
        currencyRepository.getCurrencies().subscribe((data) => {
            console.log(data);
        });
        ExchangePopularCurrenciesUseCase(
            currencyRepository,
            1,
            "EUR",
        ).then((value) => {
            console.log({ value });
        });
    }

    // ngOnInit(): void {}
}
