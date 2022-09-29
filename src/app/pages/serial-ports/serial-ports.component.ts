import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { PortInfo } from '@serialport/bindings-cpp'
@Component({
  selector: 'app-serial-ports',
  templateUrl: './serial-ports.component.html',
  styleUrls: ['./serial-ports.component.scss']
})
export class SerialPortsComponent implements OnInit, OnDestroy {
  public devices: PortInfo[] = [];
  public connectedDevicePath?: string;

  private _listPortsIntervalId?: number;

  constructor(private _electronService: ElectronService) { }

  ngOnInit(): void {
    this._listPortsIntervalId = setInterval(async () => {
      this.devices = await this._getDevices();
      console.log('this.devices', this.devices)
    }, 1000) as unknown as number
  }

  public async connectTo(portPath: string): Promise<void> {
    this.connectedDevicePath = await this._electronService
      .ipcRenderer
      .invoke('connect', portPath)
  }

  public async disconnect(): Promise<void> {
    this.connectedDevicePath = await this._electronService
      .ipcRenderer
      .invoke('disconnect', this.connectedDevicePath)
  }

  public async writeToDevice(data: string): Promise<void> {
    await this._electronService
    .ipcRenderer
    .invoke('write', data)
  }

  private async _getDevices(): Promise<PortInfo[]> {
    return await this._electronService
      .ipcRenderer
      .invoke('getDeviceList');
  }

  ngOnDestroy(): void {
    if(!this._listPortsIntervalId)
      return;

    clearInterval(this._listPortsIntervalId);
  }
}
