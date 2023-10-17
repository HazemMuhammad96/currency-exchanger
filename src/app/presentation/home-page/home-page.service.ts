import { Injectable } from "@angular/core";
import CurrencyRepository from "../../data/currency-repository";
import Exchange from "../../domain/models/exchange";
import Currency from "../../domain/models/currency";
import {
    CommonExchangePageData,
    ExchangeService,
} from "../_core/services/exchange.service";

export interface HomePageData extends CommonExchangePageData {
    frequentCurrencies: Array<Currency>;
    frequentExchanges: Array<Exchange>;
}

@Injectable({
    providedIn: "root",
})
export class HomePageService extends ExchangeService<HomePageData> {
    constructor(currencyRepository: CurrencyRepository) {
        super(
            {
                enabled: false,
                currencies: new Map<string, Currency>(),
                frequentCurrencies: [],
                baseCurrency: "EUR",
                toCurrency: "USD",
                mainExchange: undefined,
                frequentExchanges: [],
                loading: false,
            },
            currencyRepository
        );

        this.convertBasePopular();
    }

    public listenToChange(amount: number, from: string, to: string) {
        const prevFrom = this.pageData.value.baseCurrency;
        const prevTo = this.pageData.value.toCurrency;
        this.pageData.next({
            ...this.pageData.value,
            enabled: amount > 0,
            baseCurrency: from,
            toCurrency: to,
        });
        if (prevFrom !== from) {
            this.convertPopular(amount);
        }
        if (prevFrom !== from || prevTo !== to) {
            this.convertBase();
            this.exchange(amount);
        }
    }

    private async convertBasePopular() {
        const frequentExchanges = await this.convertPopular(1);
        this.pageData.next({
            ...this.pageData.value,
            frequentExchanges,
        });
    }

    private async convertPopular(amount: number) {
        this.injectLoading();

        const frequentExchangesPromise =
            this.pageData.value.frequentCurrencies.map(
                async (currency: Currency) => {
                    return await this.convert(amount, currency.shortName);
                }
            );
        return await Promise.all(frequentExchangesPromise);
    }

    public async exchange(amount: number) {
        const to = this.pageData.value.toCurrency;
        const mainExchange: Exchange = await this.convert(amount, to);
        const frequentExchanges: Array<Exchange> =
            await this.convertPopular(amount);
        this.pageData.next({
            ...this.pageData.value,
            mainExchange,
            frequentExchanges,
        });
    }
}
