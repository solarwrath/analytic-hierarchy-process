import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {PriorityTableComponent} from './priority-table/priority-table.component';
import {PriorityValuePipe} from './priority-value.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import {StoreModule} from '@ngrx/store';
import {mainReducer} from './store/main.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ItemComparisonTableComponent} from './item-comparison-table/item-comparison-table.component';
import { ComparedItemValuePipe } from './compared-item-value.pipe';
import { ResultsTableComponent } from './results-table/results-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PriorityTableComponent,
    PriorityValuePipe,
    ItemComparisonTableComponent,
    ComparedItemValuePipe,
    ResultsTableComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    StoreModule.forRoot({mainState: mainReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
