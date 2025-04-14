import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.scss'
})
export class UserChartComponent {
  data: TreeNode[] = [
    {
      label: 'المستخدمين',
      expanded: true,
      data: {
        name: 'المستخدمين',
        title: 'المستخدمين'
    },
      children: [
        {
          label: 'اداره المستخدمين',
          expanded: true,
          data: {
            name: 'اداره المستخدمين',
            title: 'اداره المستخدمين'
        },
        children: [
          {
            label: 'اداره المستخدمين',
            expanded: true,
            data: {
              name: 'اداره المستخدمين',
              title: 'اداره المستخدمين'
            },
          },
          {
            label: 'اداره المستخدمين',
            expanded: true,
            data: {
              name: 'اداره المستخدمين',
              title: 'اداره المستخدمين'
          },
          },
          {
            label: 'اداره المستخدمين',
            expanded: true,
            data: {
              name: 'اداره المستخدمين',
              title: 'اداره المستخدمين'
          },
          },
          {
            label: 'اداره المستخدمين',
            expanded: true,
            data: {
              name: 'اداره المستخدمين',
              title: 'اداره المستخدمين'
          },
          }
        ]
        }
      ]
    },

  ];
  
}
