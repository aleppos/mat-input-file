import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { FileInput } from './file-input';

@Injectable()
export class FileInterceptor implements HttpInterceptor {
  constructor () {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const formData = new FormData();
    let update = false;
    Object.keys(req.body).forEach(name => {
      let value = req.body[name];
      if (value instanceof FileInput)
      {
        update = true;
        value.files.forEach(file => {
          formData.append(name, file);
        });
      }
      else
      {
        formData.append(name, value);
      }
    });
    
    if (update)
    {
      const clone = req.clone({
        headers: req.headers.delete('Content-Type'),
        body: formData
      });
      
      return next.handle(clone);  
    }
    return next.handle(req);
  }
}