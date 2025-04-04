import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';
      let statusText = httpError.statusText || 'Unknown Error';

      if (httpError.error) {
        if (httpError.error.error?.description) {
          errorMessage = httpError.error.error.description;
        } else if (httpError.message) {
          errorMessage = httpError.message;
        }
      }

      if (httpError.status === 404) {
        errorMessage = 'لم يتم العثور على المصدر';
      } else if (httpError.status === 500) {
        errorMessage = 'حدث خطأ داخلي في الخادم';
      }

      const formattedMessage = `${errorMessage}`;

      // Display error message
      messageService.add({
        severity: 'error',
        summary: `Error ${httpError.status} - ${statusText}`,
        detail: formattedMessage,
      });

      return throwError(() => new Error(formattedMessage));
    })
  );
};
