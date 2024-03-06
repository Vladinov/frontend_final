import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';


@NgModule({
  declarations: [AppComponent],
  imports: [ HttpClientModule, 
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-hltfz0a3yttuu3ht.eu.auth0.com',
      clientId: 'lxlFHW5HeQV4Go49WNzE6OHmFrguXPYY',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
