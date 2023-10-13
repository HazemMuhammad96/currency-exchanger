import { Component, Input } from "@angular/core";

@Component({
    selector: "app-icon",
    template: `
        <i [class]="'material-symbols-outlined ' + class">
            <ng-content></ng-content>
        </i>
    `,
})
export class IconComponent {
    @Input() class: string = "";
}
