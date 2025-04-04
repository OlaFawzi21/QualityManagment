import { Component } from '@angular/core';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrl: './place-details.component.scss',
})
export class PlaceDetailsComponent {
  images: any[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  videoDialogVisible = false;

  showVideoDialog() {
    this.videoDialogVisible = true;
  }
  constructor() {
    this.images = [
      {
        itemImageSrc: '../../../../../assets/images/img/Rectangle 124708.png',
        alt: 'Image 1',
      },
      {
        itemImageSrc: '../../../../../assets/images/img/متحف.png',
        alt: 'Image 2',
      },
      {
        itemImageSrc: '../../../../../assets/images/img/جبال.png',
        alt: 'Image 3',
      },
    ];
  }

  ngOnInit() {}
}
