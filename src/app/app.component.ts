import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'electron-angular-test-project';

  constructor(private _router: Router) {

  }

  public goToSerialPorts(): void {
    this._router.navigateByUrl('serial-ports')
  }
}
