import CurrencyRepository from "../data/currency-repository";
import GetCurrencyFullNameUseCase from "./get-currency-name-usecase";

export default function exchangeRateUseCase(
    currencyRepository: CurrencyRepository,
    amount: number,
    fromCurrency: string,
    toCurrency: string
):Promise<{
    value: number;
    name: string;
}> {
    return new Promise((resolve, reject) => {
        currencyRepository.getCurrencies().subscribe((currenciesInfo) => {
            const fromCurrencyRate =
                currenciesInfo.rates.get(fromCurrency) ?? 1;
            const fromToBase = amount / fromCurrencyRate;
            const toCurrencyRate = currenciesInfo.rates.get(toCurrency) ?? 1;
            const finalValue = fromToBase * toCurrencyRate;
            resolve({
              value: finalValue,
              name: GetCurrencyFullNameUseCase(toCurrency),
            });
        });
    });
}
