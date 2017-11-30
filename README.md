Froked from "http://plnkr.co/edit/VGCSprNVT1pobOxjWwmT"
# mat-input-file

import { MatInputFileComponent } from '../mat-input-file/mat-input-file/mat-input-file.component';
import { FileValidatores } from '../mat-input-file/file-validatores';



--------------

export class RegisterComponent implements OnInit {
  private videoForm: FormGroup;
  private loading: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, public snackbar: MatSnackBar) {
    this.videoForm = this.fb.group({
      file: [{ value: undefined, disabled: false }, [Validators.required, FileValidatores.maxContentSize(104857600)]],
    });
  }

  doUpload() {
    if (!this.videoForm.valid) return;
    //this.loading = true;
    this.http.post(`upload`, this.videoForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
      }
    );
  }

  ngOnInit() {}
}


--------------
<form [formGroup]="videoForm" (ngSubmit)="doUpload()">
  <mat-form-field>
    <mat-input-file #videoFile formControlName="file" placeholder="Video" valuePlaceholder="No file selected" required></mat-input-file>
    <mat-icon matSuffix>folder</mat-icon>
  </mat-form-field>
  <button mat-raised-button [disabled]="videoForm.invalid" fxFlexOffset="20px">Upload</button>
</form>