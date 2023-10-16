import Currency from "./currency";

export default class Exchange {
    public constructor(
        public fromAmount: number,
        public from: Currency,
        public toAmount: number,
        public to: Currency
    ) {}

  get fromAmountString(): string {
    return this.fromAmount.toFixed(2);
  }

  get toAmountString(): string {
    return this.toAmount.toFixed(2);
  }
}
