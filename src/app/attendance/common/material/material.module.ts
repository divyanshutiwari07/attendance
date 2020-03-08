import { NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule

} from '@angular/material';

const Material = [
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
