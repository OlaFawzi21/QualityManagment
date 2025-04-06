import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'support',
})
export class SupportPipe implements PipeTransform {
  transform(value: number): string {
    const types: Record<number, string> = {
      1: 'استفسار عام',
      2: 'مقترحات',
      3: 'شكاوي',
    };

    return types[value] ?? 'غير معروفه';
  }
}