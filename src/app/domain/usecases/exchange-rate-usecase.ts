import GetCurrenciesUseCase from "./get-currencies-usecase";
import Exchange from "../models/exchange";
import Currency from "../models/currency";

export default class ExchangeRateUseCase {
    currenciesInfo: {
        rates: Map<string, Currency>;
        base: string;
    } = {
        rates: new Map<string, Currency>(),
        base: "EUR",
    };
    private defaultCurrency: Currency = new Currency("EUR", "Euro", 1);

    constructor(private getCurrenciesUseCase: GetCurrenciesUseCase) {}

    async execute(
        amount: number,
        fromCurrency: string,
        toCurrency: string
    ): Promise<Exchange> {
        if (this.currenciesInfo.rates.size === 0) {
            this.currenciesInfo = await this.getCurrenciesUseCase.execute();
        }
        const fromCurrencyDetails: Currency =
            this.currenciesInfo.rates.get(fromCurrency) ?? this.defaultCurrency;
        const fromToBase = amount / fromCurrencyDetails.rate;
        const toCurrencyDetails =
            this.currenciesInfo.rates.get(toCurrency) ?? this.defaultCurrency;
        const finalValue = fromToBase * toCurrencyDetails.rate;

        return new Exchange(
            amount,
            fromCurrencyDetails,
            finalValue,
            toCurrencyDetails
        );
    }
}
