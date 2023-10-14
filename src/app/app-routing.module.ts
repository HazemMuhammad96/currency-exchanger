import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./presentation/home-page/home-page.component";
import { DetailsPageComponent } from "./presentation/details-page/details-page.component";

const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
    },
    {
        path: "details/:currencies",
        component: DetailsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
