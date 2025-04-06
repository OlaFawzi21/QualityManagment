import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transType',
})
export class TransTypePipe implements PipeTransform {
  transform(value: number): string {
    const types: Record<number, string> = {
      0: 'طائرة',
      1: 'سيارة',
      2: 'حافلة',
      3: 'قطار',
      4: 'دراجة',
    };

    return types[value] ?? 'غير معروفه'; // Default text if not found
  }
}
