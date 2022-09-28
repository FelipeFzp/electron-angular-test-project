import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerialPortsModule } from './pages/serial-ports/serial-ports.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/serial-ports/serial-ports.module').then(m => m.SerialPortsModule)
  },
  {
    path: 'serial-ports',
    loadChildren: () => import('./pages/serial-ports/serial-ports.module').then(m => m.SerialPortsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SerialPortsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
