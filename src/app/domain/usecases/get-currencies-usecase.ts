import CurrencyRepository from "../../data/currency-repository";
import Currency from "../models/currency";
import GetCurrencyFullNameUseCase from "./get-currency-name-usecase";

export default class GetCurrenciesUseCase {
    constructor(private currencyRepository: CurrencyRepository) {}

    async execute(): Promise<{
        rates: Map<string, Currency>;
        base: string;
    }> {
        const data = await this.currencyRepository.getCurrencies();
        return {
            base: data.base,
            rates: new Map<string, Currency>(
                Array.from(data.rates.entries()).map(([key, value]) => [
                    key,
                    new Currency(key, GetCurrencyFullNameUseCase(key), value),
                ])
            ),
        };
    }
}
