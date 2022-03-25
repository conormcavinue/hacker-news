import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculateDatePipe } from '../shared/calculate-date.pipe';



@NgModule({
  declarations: [
    CalculateDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class StoryListModule { }
