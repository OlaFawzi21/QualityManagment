import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textPipe',
})
export class TextPipePipe implements PipeTransform {
  transform(value: number): string {
    const types: Record<number, string> = {
      0: 'تاريخي',
      1: 'أثري',
      2: 'ثقافي',
      3: 'طبيعي',
      4: 'ديني',
    };

    return types[value] ?? 'غير معروفه'; // Default text if not found
  }
}
