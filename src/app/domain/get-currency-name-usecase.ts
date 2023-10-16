export default function GetCurrencyFullNameUseCase(shortName: string): string {
    const currencies = new Intl.DisplayNames(["en"], { type: "currency" });
    return currencies.of(shortName) ?? "Unknown";
}
