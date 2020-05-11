import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {PriorityTableComponent} from './priority-table/priority-table.component';
import {PriorityValuePipe} from './priority-value.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import { StoreModule } from '@ngrx/store';
import {counterReducer} from './store/counter.reduce';
import {MyCounterComponent} from './my-counter/my-counter.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PriorityTableComponent,
    PriorityValuePipe,
    MyCounterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    StoreModule.forRoot({counterState: counterReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
