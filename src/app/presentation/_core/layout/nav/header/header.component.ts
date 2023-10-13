import { Component } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    isMenuOpen: boolean = false;
    readonly routes: {
        path: string;
        label: string;
    }[] = [
        {
            path: "/details/eur-usd",
            label: "EUR - USD Details",
        },
        {
            path: "/details/eur-gbp",
            label: "EUR - GBP Details",
        },
    ];
}
