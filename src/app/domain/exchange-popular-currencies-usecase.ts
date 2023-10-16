import CurrencyRepository from "../data/currency-repository";
import exchangeRateUseCase from "./exchange-rate-usecase";

export default async function ExchangePopularCurrenciesUseCase(
    currencyRepository: CurrencyRepository,
    amount: number,
    fromCurrency: string
) {
    return new Promise((resolve, reject) => {
        currencyRepository.getCurrencies().subscribe((currenciesInfo) => {
            const frequentCurrencies = Array.from(
                currenciesInfo.rates.entries()
            ).slice(0, 9);

            resolve(
                Promise.all(
                    frequentCurrencies.map((currency) =>
                        exchangeRateUseCase(
                            currencyRepository,
                            amount,
                            fromCurrency,
                            currency[0]
                        )
                    )
                )
            );
        });
    });
}
