import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PriorityTableComponent} from './priority-table/priority-table.component';
import {FormsModule} from '@angular/forms';
import {PriorityValuePipe} from './priority-value.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PriorityTableComponent,
    PriorityValuePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
