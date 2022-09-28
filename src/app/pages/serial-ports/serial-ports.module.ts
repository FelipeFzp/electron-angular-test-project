import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerialPortsComponent } from './serial-ports.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SerialPortsComponent
  ],
  exports: [
    SerialPortsComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      component: SerialPortsComponent
    }]),
    CommonModule
  ]
})
export class SerialPortsModule { }
