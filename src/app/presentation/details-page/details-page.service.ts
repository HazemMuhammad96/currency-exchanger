import { Injectable } from "@angular/core";
import {
    CommonExchangePageData,
    ExchangeService,
} from "../_core/services/exchange.service";
import Exchange from "../../domain/models/exchange";
import Currency from "../../domain/models/currency";
import CurrencyRepository from "../../data/currency-repository";
import { ActivatedRoute } from "@angular/router";

export interface DetailsPageData extends CommonExchangePageData {}

@Injectable({
    providedIn: "root",
})
export class DetailsPageService extends ExchangeService<DetailsPageData> {
    constructor(currencyRepository: CurrencyRepository) {
        super(
            {
                enabled: false,
                currencies: new Map<string, Currency>(),
                baseCurrency: "EUR",
                toCurrency: "USD",
                mainExchange: undefined,
            },
            currencyRepository
        );
    }

    public listenToChange(amount: number, from: string, to: string) {
        const prevTo = this.pageData.value.toCurrency;
        this.pageData.next({
            ...this.pageData.value,
            enabled: amount > 0,
            baseCurrency: from,
            toCurrency: to,
        });

        if (prevTo !== to) {
            this.convertBase();
            this.exchange(amount);
        }
    }

    public async exchange(amount: number) {
        const to = this.pageData.value.toCurrency;
        const mainExchange: Exchange = await this.convert(amount, to);
        this.pageData.next({
            ...this.pageData.value,
            mainExchange,
        });
    }
}
