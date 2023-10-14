import { Component, Input } from "@angular/core";

@Component({
    selector: "app-icon-button",
    templateUrl: "./icon-button.component.html",
    styleUrls: ["./icon-button.component.scss"],
})
export class IconButtonComponent {
    @Input("size") size: "regular" | "expanded" | "custom" = "regular";
    @Input("label") label = "";
    @Input("label-placement") labelPlacement: "block" | "overlay" | "hidden" =
        "hidden";
    @Input("type") type: "submit" | "reset" | "button" | "link" = "button";
}