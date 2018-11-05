
import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html'
})
export class ScanComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  public onScan(result: string): void {
    this.alertService.success(result);
    this.router.navigate(['../result', result], { relativeTo: this.activatedRoute });
  }

  public onTimeout(): void {
    this.alertService.success('You missed a QR Code!');
    this.router.navigate(['../start'], { relativeTo: this.activatedRoute});
  }
}
