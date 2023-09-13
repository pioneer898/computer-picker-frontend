import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { SimplebarAngularModule } from 'simplebar-angular';

import { LoginComponent } from './components/login/login.component';
import { PickerComponent } from './components/picker/picker.component';
import { ConfigComponentComponent } from './components/config-component/config-component.component';
import { ComponentOptionComponent } from './components/component-option/component-option.component';
import { ComponentInfoDialogComponent } from './components/component-info-dialog/component-info-dialog.component';
import { SelectedOptionComponent } from './components/selected-option/selected-option.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PickerComponent,
    ConfigComponentComponent,
    ComponentOptionComponent,
    ComponentInfoDialogComponent,
    SelectedOptionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxLoadingButtonsModule,
    MatDividerModule,
    MatToolbarModule,
    MatTabsModule,

    SimplebarAngularModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
