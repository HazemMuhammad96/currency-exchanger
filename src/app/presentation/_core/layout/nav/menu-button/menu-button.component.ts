import { Component, Input } from "@angular/core";

@Component({
    selector: "app-menu-button",
    template: `
        <button [attr.aria-checked]="isMenuOpen" class="menu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    `,
    styleUrls: ["./menu-button.component.scss"],
})
export class MenuButtonComponent {
    @Input("open") isMenuOpen: boolean = false;
}
