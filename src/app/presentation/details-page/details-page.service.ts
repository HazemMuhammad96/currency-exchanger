import { Injectable } from "@angular/core";
import {
    CommonExchangePageData,
    ExchangeService,
} from "../_core/services/exchange.service";
import Exchange from "../../domain/models/exchange";
import Currency from "../../domain/models/currency";
import CurrencyRepository from "../../data/currency-repository";
import GetAnnualRateUseCase from "../../domain/usecases/get-annual-rate-usecase";
import { ChartData } from "../_core/components/chart/chart.component";

export interface DetailsPageData extends CommonExchangePageData {
    annualRates: ChartData;
    annualRatesLoading: boolean;
}

@Injectable({
    providedIn: "root",
})
export class DetailsPageService extends ExchangeService<DetailsPageData> {
    private getAnnualRateUseCase: GetAnnualRateUseCase;

    constructor(currencyRepository: CurrencyRepository) {
        super(
            {
                enabled: false,
                currencies: new Map<string, Currency>(),
                baseCurrency: "",
                toCurrency: "",
                mainExchange: undefined,
                annualRates: [],
                loading: false,
                annualRatesLoading: false,
            },
            currencyRepository
        );

        this.getAnnualRateUseCase = new GetAnnualRateUseCase(
            currencyRepository
        );
        this.fetchAnnualRates();
    }

    private async fetchAnnualRates() {
        if (
            !this.pageData.value.baseCurrency ||
            !this.pageData.value.toCurrency
        )
            return;
        this.pageData.next({
            ...this.pageData.value,
            annualRatesLoading: true,
        });
        const annualRates: ChartData = await this.getAnnualRateUseCase.execute(
            this.pageData.value.baseCurrency,
            this.pageData.value.toCurrency
        );
        this.pageData.next({
            ...this.pageData.value,
            annualRatesLoading: false,
            annualRates,
        });
        setTimeout(() => {
            this.pageData.next({
                ...this.pageData.value,
                annualRates,
            });
        }, 1);
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
            this.fetchAnnualRates().then(() => {
                this.exchange(amount);
                this.convertBase();
            });
        }
    }

    public async exchange(amount: number) {
        const to = this.pageData.value.toCurrency;
        const mainExchange: Exchange = await this.convert(amount, to);
        this.pageData.next({
            ...this.pageData.value,
            mainExchange,
            loading: false,
        });
    }
}
