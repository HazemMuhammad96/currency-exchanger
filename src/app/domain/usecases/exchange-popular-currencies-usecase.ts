import GetCurrenciesUseCase from "./get-currencies-usecase";
import ExchangeRateUseCase from "./exchange-rate-usecase";
import Exchange from "../models/exchange";
import Currency from "../models/currency";

export default class ExchangePopularCurrenciesUseCase {
    private currenciesInfo: {
        rates: Map<string, Currency>;
        base: string;
    } = {
        rates: new Map<string, Currency>(),
        base: "EUR",
    };

    constructor(
        private getCurrenciesUseCase: GetCurrenciesUseCase,
        private exchangeRateUseCase: ExchangeRateUseCase
    ) {}

    async execute(
        amount: number,
        fromCurrency: string
    ): Promise<Array<Exchange>> {
        if (this.currenciesInfo.rates.size === 0) {
            this.currenciesInfo = await this.getCurrenciesUseCase.execute();
        }
        const frequentCurrencies = Array.from(
            this.currenciesInfo.rates.entries()
        ).slice(0, 9);

        return await Promise.all(
            frequentCurrencies.map((currency) =>
                this.exchangeRateUseCase.execute(
                    amount,
                    fromCurrency,
                    currency[0]
                )
            )
        );
    }
}
