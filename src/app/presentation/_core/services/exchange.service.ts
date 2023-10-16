import Currency from "../../../domain/models/currency";
import Exchange from "../../../domain/models/exchange";
import { BehaviorSubject } from "rxjs";
import CurrencyRepository from "../../../data/currency-repository";
import GetCurrenciesUseCase from "../../../domain/usecases/get-currencies-usecase";
import ExchangeRateUseCase from "../../../domain/usecases/exchange-rate-usecase";

export interface CommonExchangePageData {
    enabled: boolean;
    currencies: Map<string, Currency>;
    baseCurrency: string;
    toCurrency: string;
    mainExchange?: Exchange;
    baseExchange?: Exchange;
}

export class ExchangeService<T extends CommonExchangePageData> {
    public pageData: BehaviorSubject<T>;
    protected readonly getCurrenciesUseCase: GetCurrenciesUseCase;
    protected readonly exchangeUseCase: ExchangeRateUseCase;

    constructor(pageData: T, currencyRepository: CurrencyRepository) {
        this.pageData = new BehaviorSubject<T>(pageData);
        this.getCurrenciesUseCase = new GetCurrenciesUseCase(
            currencyRepository
        );
        this.exchangeUseCase = new ExchangeRateUseCase(
            this.getCurrenciesUseCase
        );

        this.fetchCurrencies();
        this.convertBase();
    }

    get currenciesNames(): Array<string> {
        return Array.from(this.pageData.value.currencies.keys());
    }

    private fetchCurrencies() {
        this.getCurrenciesUseCase.execute().then((data) => {
            this.pageData.next({
                ...this.pageData.value,
                currencies: data.rates,
                frequentCurrencies: Array.from(data.rates.values()).slice(0, 9),
            });
        });
    }

    protected convert(amount: number, to: string) {
        const from = this.pageData.value.baseCurrency;
        return this.exchangeUseCase.execute(amount, from, to);
    }

    protected async convertBase() {
        const baseExchange = await this.convert(
            1,
            this.pageData.value.toCurrency
        );
        this.pageData.next({
            ...this.pageData.value,
            baseExchange,
        });
    }
}
