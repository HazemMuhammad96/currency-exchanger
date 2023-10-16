export default function CurrencyFullNameUseCase(shortName: string) {
    const currencies = new Intl.DisplayNames(["en"], { type: "currency" });
    return currencies.of(shortName);
}
