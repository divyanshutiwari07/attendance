import { NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,

} from '@angular/material';

const Material = [
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
