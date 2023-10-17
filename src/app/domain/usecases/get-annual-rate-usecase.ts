import CurrencyRepository from "../../data/currency-repository";

export default class GetAnnualRateUseCase {
    constructor(private currencyRepository: CurrencyRepository) {}

    private formatLastDayOfMonth(year: number, month: number) {
        const lastDay = new Date(year, month + 1, 0); // Get the last day of the specified month
        const yyyy = lastDay.getFullYear();
        const mm = String(lastDay.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
        const dd = String(lastDay.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    private getLastDaysOfTheYear() {
        const lastDays = [];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        for (let month = 0; month <= currentMonth; month++) {
            const formattedLastDay = this.formatLastDayOfMonth(
                currentYear,
                month
            );
            lastDays.push(formattedLastDay);
        }
        return lastDays;
    }

    private getMonthName(date: string): string {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = new Date(date).getMonth();
        return monthNames[month];
    }

    private convert(
        rates: Map<string, number>,
        from: string,
        to: string
    ): number {
        const amount = 1;
        const fromCurrencyRate = rates.get(from) ?? 1;
        const fromToBase = amount / fromCurrencyRate;
        const toCurrencyRate = rates.get(to) ?? 1;
        return fromToBase * toCurrencyRate;
    }

    async execute(
        from: string,
        to: string
    ): Promise<
        Array<{
            label: string;
            value: number;
        }>
    > {
        const lastDaysOfMonths = this.getLastDaysOfTheYear();
        const annualRates = await Promise.all(
            lastDaysOfMonths.map((date, i) =>
                i === lastDaysOfMonths.length - 1
                    ? this.currencyRepository.getCurrencies()
                    : this.currencyRepository.getHistoricalCurrencies(date)
            )
        );
      return annualRates.map((rate) => ({
          label: this.getMonthName(rate.date),
          value: this.convert(rate.rates, from, to),
      }));
    }
}
