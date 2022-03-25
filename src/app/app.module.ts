import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { StoryModule } from './story/story.module';
import { CalculateDatePipe } from './shared/calculate-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    CalculateDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoryModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
