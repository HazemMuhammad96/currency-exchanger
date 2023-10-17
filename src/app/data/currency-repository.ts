import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export default class CurrencyRepository {
    params = new HttpParams();

    constructor(private httpClient: HttpClient) {
        this.params = this.params.append("access_key", environment.apiKey);
    }

    getCurrencies(): Promise<{
        rates: Map<string, number>;
        base: string;
        date: string;
    }> {
        return new Promise((resolve) => {
            this.httpClient
                .get(environment.apiUrl + "/latest", {
                    params: this.params,
                })
                .pipe(
                    map((data: any) => {
                        return {
                            base: data.base,
                            rates: new Map<string, number>(
                                Object.entries(data.rates)
                            ),
                            date: data.date,
                        };
                    })
                )
                .subscribe((data) => {
                    if (data) resolve(data);
                });
        });
    }

    getHistoricalCurrencies(date: string): Promise<{
        rates: Map<string, number>;
        base: string;
        date: string;
    }> {
        return new Promise((resolve) => {
            this.httpClient
                .get(environment.apiUrl + `/${date}`, {
                    params: this.params,
                })
                .pipe(
                    map((data: any) => {
                        return {
                            base: data.base,
                            rates: new Map<string, number>(
                                Object.entries(data.rates ?? {})
                            ),
                            date,
                        };
                    })
                )
                .subscribe((data) => {
                    if (data) resolve(data);
                });
        });
    }
}
