import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { CalculateDatePipe } from './shared/calculate-date.pipe';
import { FormsModule } from '@angular/forms';
import { StoryListComponent } from './story/story-list.component';
import { StoreModule } from '@ngrx/store';
import { storiesReducer } from './store/store.reducer';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    StoryComponent,
    CalculateDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
        stories: storiesReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
