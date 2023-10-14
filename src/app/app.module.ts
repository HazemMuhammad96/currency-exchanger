import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./presentation/_core/layout/nav/header/header.component";
import { RootComponent } from "./presentation/_core/layout/root/root.component";
import { NgOptimizedImage } from "@angular/common";
import { IconComponent } from "./presentation/_core/components/icon/icon.component";
import { MenuButtonComponent } from "./presentation/_core/layout/nav/menu-button/menu-button.component";
import { CurrencyFormComponent } from './presentation/currency-form/currency-form.component';
import { HomePageComponent } from './presentation/home-page/home-page.component';
import { DetailsPageComponent } from './presentation/details-page/details-page.component';
import { ChartComponent } from './presentation/_core/components/chart/chart.component';
import { IconButtonComponent } from './presentation/_core/components/buttons/icon-button/icon-button.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RootComponent,
        IconComponent,
        MenuButtonComponent,
        CurrencyFormComponent,
        HomePageComponent,
        DetailsPageComponent,
        ChartComponent,
        IconButtonComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
