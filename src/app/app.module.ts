import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoformComponent } from './shared/components/todoform/todoform.component';
import { TodolistComponent } from './shared/components/todolist/todolist.component';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetconfirmComponent } from './shared/components/getconfirm/getconfirm.component';
import { HttpClientModule } from '@angular/common/http';
// import { UuidComponent } from './shared/services/uuid/uuid.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoformComponent,
    TodolistComponent,
    GetconfirmComponent,
    // UuidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
