import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./presentation/_core/layout/nav/header/header.component";
import { RootComponent } from "./presentation/_core/layout/root/root.component";
import { NgOptimizedImage } from "@angular/common";
import { MenuButtonComponent } from "./presentation/_core/layout/nav/menu-button/menu-button.component";
import { CurrencyFormComponent } from "./presentation/currency-exchanger/currency-form/currency-form.component";
import { HomePageComponent } from "./presentation/home-page/home-page.component";
import { DetailsPageComponent } from "./presentation/details-page/details-page.component";
import { ChartComponent } from "./presentation/_core/components/chart/chart.component";
import { IconButtonComponent } from "./presentation/_core/components/buttons/icon-button/icon-button.component";
import { CurrenciesSelectorComponent } from "./presentation/currency-exchanger/currencies-selector/currencies-selector.component";
import { DetailedCurrencyFormComponent } from "./presentation/currency-exchanger/detailed-currency-form/detailed-currency-form.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ExchangeResultComponent } from './presentation/currency-exchanger/exchange-result/exchange-result.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RootComponent,
        MenuButtonComponent,
        CurrencyFormComponent,
        HomePageComponent,
        DetailsPageComponent,
        ChartComponent,
        IconButtonComponent,
        CurrenciesSelectorComponent,
        DetailedCurrencyFormComponent,
        ExchangeResultComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
