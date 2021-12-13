import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing";
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { TestNavComponent } from './test-nav/test-nav.component';



@NgModule({
    declarations: [
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        SidenavComponent,
        TestNavComponent
    ],
    imports: [
        DashboardRoutingModule,
        SharedModule,
    ],
    exports: [],
})
export class DashboardModule {

}