import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ByteFormatPipe } from './byte-format.pipe';
import { MatInputFileComponent } from './mat-input-file/mat-input-file.component';
import { FileInterceptor } from './file.interceptor'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ByteFormatPipe,
    MatInputFileComponent
  ],
  exports: [
    ByteFormatPipe,
    MatInputFileComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FileInterceptor, multi: true }
  ]
})
export class MatInputFileModule { }
