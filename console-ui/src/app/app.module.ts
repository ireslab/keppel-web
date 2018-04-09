import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoadingModule } from 'ngx-loading'


import { ServiceCall } from './network_layer/web_service_call';
import { localJSON } from './commom_methods/localJSON';
import { CommonServices } from './commom_methods/common_service'



import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserRecommendationComponent } from './sign-up/new-user-sign-up/user-recommendation/user-recommendation.component';
import { UserContractComponent } from './sign-up/new-user-sign-up/user-contract/user-contract.component';
import { UserConfirmationComponent } from './sign-up/new-user-sign-up/user-confirmation/user-confirmation.component';
import { BusinessDetailsComponent } from './sign-up/business-user-sign-up/business-details/business-details.component';
import { BusinessContactDetailsComponent } from './sign-up/business-user-sign-up/business-contact-details/business-contact-details.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { ExistingRecommendationComponent } from './sign-up/existing-user-sign-up/existing-recommendation/existing-recommendation.component';
import { ExistingContractComponent } from './sign-up/existing-user-sign-up/existing-contract/existing-contract.component';
import { ExistingConfirmationComponent } from './sign-up/existing-user-sign-up/existing-confirmation/existing-confirmation.component';
import { recaptcha } from './recaptcha/recaptcha.component';
import { DataShare } from './Utility/data_share.service';



const appRoutes: Routes = [
  { path: 'keppel', component: LandingPageComponent },
  { path: 'aknowledgement', component: AcknowledgementComponent },
  { path: 'new-user-recommendation', component: UserRecommendationComponent },
  { path: 'new-user-contract', component: UserContractComponent },
  { path: 'new-user-confirmation', component: UserConfirmationComponent },
  { path: 'existing-recommendation', component: ExistingRecommendationComponent },
  { path: 'existing-contract', component: ExistingContractComponent },
  { path: 'existing-confirmation', component: ExistingConfirmationComponent },
  { path: 'business-details', component: BusinessDetailsComponent },
  { path: 'business-contact', component: BusinessContactDetailsComponent },
  
 
  {
    path: '',
    redirectTo: '/keppel',
    pathMatch: 'full'
  },
  { path: '**', component: LandingPageComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UserRecommendationComponent,
    UserContractComponent,
    UserConfirmationComponent,
    BusinessDetailsComponent,
    BusinessContactDetailsComponent,
    FooterComponent,
    SidebarComponent,
    AcknowledgementComponent,
    ExistingRecommendationComponent,
    ExistingContractComponent,
    ExistingConfirmationComponent,
    recaptcha
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),LoadingModule
  ],
  providers: [SidebarService,ServiceCall,localJSON,CommonServices,DataShare],
  bootstrap: [AppComponent]
})
export class AppModule { }
