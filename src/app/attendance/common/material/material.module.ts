import { NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,

} from '@angular/material';

const Material = [
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
