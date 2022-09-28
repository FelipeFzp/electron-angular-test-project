import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-serial-ports',
  templateUrl: './serial-ports.component.html',
  styleUrls: ['./serial-ports.component.scss']
})
export class SerialPortsComponent implements OnInit {
  public devices: any[] = [];

  constructor(private _electonService: ElectronService) { }

  ngOnInit(): void {
    
  }

  public async requestDevice(): Promise<void> {

  }
}
