import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneratePdfService } from 'src/app/_metronic/layout/core/services/reports/generate-pdf.service';
import { UsersService } from 'src/app/_metronic/layout/core/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _UsersService = inject(UsersService);
  private readonly _GeneratePdfService = inject(GeneratePdfService);
  assets: any = environment.assets;
  userActivity: any[] = [];
  userID: number;
  ngOnInit(): void {
    this.userID = Number(this.route.parent?.snapshot.paramMap.get('id'));

    console.log(this.userID);
    this._UsersService.getUserById(this.userID).subscribe((res) => {
      this.userActivity = res.data.userActivity;
      console.log('userActivity', this.userActivity);

      this.cdr.detectChanges();
    });
  }
  exportPDF() {
    this._UsersService.userActivityReport(this.userID).subscribe(
      (res: any) => {
        console.log('API Response:', res);
        const responseBody = res.body ? res.body : res;
        if (responseBody?.data) {
          this._GeneratePdfService.dwonloadWithAuth(
            { file: responseBody.data, fileName: 'Tourist.pdf' },
            'pdf'
          );
        } else {
          console.error(
            'Invalid response format or missing file data',
            responseBody
          );
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}
