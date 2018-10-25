import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule,MatInputModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule} from '@angular/material'
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppComponent } from './app.component';

import { LayoutModule } from '@angular/cdk/layout';
import { DataTableComponent } from './data-table/data-table.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetServiceService } from './pet-service.service';
import { PetDialogComponent, DialogOverviewExampleDialog } from './pet-dialog/pet-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DataTableComponent,
    PetListComponent,
    PetDialogComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
  ],
  providers: [PetServiceService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
