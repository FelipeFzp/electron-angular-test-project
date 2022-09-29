import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-serial-ports',
  templateUrl: './serial-ports.component.html',
  styleUrls: ['./serial-ports.component.scss']
})
export class SerialPortsComponent implements OnInit {
  public response: string = '';

  constructor(private _electronService: ElectronService) { }

  ngOnInit(): void {
     
  }

  public async requestDevice(portPath: string): Promise<void> {
    // Access electron apis on rederer process:
    const { SerialPort } = window.require('serialport')
    this.response = JSON.stringify(await SerialPort.list())
    
    // Run the same code above but in main process:
    // const response = this._electronService.ipcRenderer.sendSync('get-device-list', portPath)
    // this.response = response
  }
}
