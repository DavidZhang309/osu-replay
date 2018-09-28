import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReplaySelectComponent } from './replay-select/replay-select.component';
import { ReplayPlayerComponent } from './replay-player/replay-player.component';

@NgModule({
  declarations: [
    AppComponent,
    ReplaySelectComponent,
    ReplayPlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
