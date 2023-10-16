import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: "root",
})
export default class CurrencyRepository {
    params = new HttpParams();

    constructor(private httpClient: HttpClient) {
        console.log({ apiKey: environment.apiKey });
        this.params = this.params.append("access_key", environment.apiKey);
    }

    getCurrencies(): Observable<{
        rates: Map<string, number>;
        base: string;
    }> {
        return this.httpClient
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
                    };
                })
            );
    }
}
