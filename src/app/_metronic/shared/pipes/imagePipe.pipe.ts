import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe',
})
export class ImagePipePipe implements PipeTransform {
  transform(value: number): string {
    const images: Record<number, string> = {
      0: 'assets/images/icons/Group-2.svg',
      1: 'assets/images/img/erth.svg',
      2: 'assets/images/icons/Vector-2.svg',
      3: 'assets/images/img/gabal.svg',
      4: 'assets/images/img/mosque.svg',
    };

    return images[value] ?? 'assets/images/img/erth.svg';
  }
}
