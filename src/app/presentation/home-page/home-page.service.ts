import { Injectable } from "@angular/core";
import CurrencyRepository from "../../data/currency-repository";
import GetCurrenciesUseCase from "../../domain/usecases/get-currencies-usecase";
import { BehaviorSubject } from "rxjs";
import Exchange from "../../domain/models/exchange";
import ExchangeRateUseCase from "../../domain/usecases/exchange-rate-usecase";
import Currency from "../../domain/models/currency";

export interface HomePageData {
    enabled: boolean;
    currencies: Map<string, Currency>;
    frequentCurrencies: Array<Currency>;
    baseCurrency: string;
    toCurrency: string;
    mainExchange?: Exchange;
    baseExchange?: Exchange;
    frequentExchanges: Array<Exchange>;
}

@Injectable({
    providedIn: "root",
})
export class HomePageService {
    public homePageData: BehaviorSubject<HomePageData> =
        new BehaviorSubject<HomePageData>({
            enabled: false,
            currencies: new Map<string, Currency>(),
            frequentCurrencies: [],
            baseCurrency: "EUR",
            toCurrency: "USD",
            mainExchange: undefined,
            frequentExchanges: [],
        });
    private readonly getCurrenciesUseCase: GetCurrenciesUseCase;
    private readonly exchangeUseCase: ExchangeRateUseCase;

    constructor(currencyRepository: CurrencyRepository) {
        this.getCurrenciesUseCase = new GetCurrenciesUseCase(
            currencyRepository
        );
        this.exchangeUseCase = new ExchangeRateUseCase(
            this.getCurrenciesUseCase
        );

        this.fetchCurrencies();
        this.convertBase();
    }

    private fetchCurrencies() {
        this.getCurrenciesUseCase.execute().then((data) => {
            this.homePageData.next({
                ...this.homePageData.value,
                currencies: data.rates,
                frequentCurrencies: Array.from(data.rates.values()).slice(0, 9),
            });
        });
    }

    get currenciesNames(): Array<string> {
        return Array.from(this.homePageData.value.currencies.keys());
    }

    public listenToChange(amount: number, from: string, to: string) {
        const prevFrom = this.homePageData.value.baseCurrency;
        const prevTo = this.homePageData.value.toCurrency;
        this.homePageData.next({
            ...this.homePageData.value,
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

    private convert(amount: number, to: string) {
        const from = this.homePageData.value.baseCurrency;
        return this.exchangeUseCase.execute(amount, from, to);
    }

    private async convertBase() {
        const baseExchange = await this.convert(
            1,
            this.homePageData.value.toCurrency
        );
        const frequentExchanges = await this.convertPopular(1);
        this.homePageData.next({
            ...this.homePageData.value,
            baseExchange,
            frequentExchanges,
        });
    }

    private async convertPopular(amount: number) {
        const frequentExchangesPromise =
            this.homePageData.value.frequentCurrencies.map(
                async (currency: Currency) => {
                    return await this.convert(amount, currency.shortName);
                }
            );
        return await Promise.all(frequentExchangesPromise);
    }

    public async exchange(amount: number) {
        const to = this.homePageData.value.toCurrency;
        const mainExchange: Exchange = await this.convert(amount, to);
        const frequentExchanges: Array<Exchange> =
            await this.convertPopular(amount);
        this.homePageData.next({
            ...this.homePageData.value,
            mainExchange,
            frequentExchanges,
        });
    }
}
