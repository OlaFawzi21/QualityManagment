import { Component } from '@angular/core';
interface Activity {
  id: string
  action: string
  email: string
  time: string
}
interface User {
  name: string;
  email: string;
  points: number;
  type: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activities: Activity[] = [
    {
      id: "1",
      action: "سجل دخول",
      email: "mrgeek.mohamed@gmail.com",
      time: "08:42",
    },
    {
      id: "2",
      action: "قام بتحميل مستند",
      email: "mrgeek.mohamed@gmail.com",
      time: "08:42",
    },
    {
      id: "3",
      action: "قام بتحميل مستند",
      email: "mrgeek.mohamed@gmail.com",
      time: "08:42",
    },
    {
      id: "4",
      action: "قام بطباعه اجراء",
      email: "mrgeek.mohamed@gmail.com",
      time: "08:42",
    },
    {
      id: "5",
      action: "قام بطباعه اجراء",
      email: "mrgeek.mohamed@gmail.com",
      time: "08:42",
    },
  ]

  isLastItem(id: string): boolean {
    return id === this.activities[this.activities.length - 1].id
  }

  users: User[] = [];
  first = 0;
  rows = 10;

  ngOnInit() {
    this.users = [
      {
        name: 'حاتم عبد الحميد السيد',
        email: 'info2933@gmail.com',
        points: 2394,
        type: 'WS'
      },
      {
        name: 'حاتم عبد الحميد السيد',
        email: 'info2933@gmail.com',
        points: 2394,
        type: 'WS'
      },
      {
        name: 'حاتم عبد الحميد السيد',
        email: 'info2933@gmail.com',
        points: 2394,
        type: 'WS'
      },
    ];
  }
  newUsers = [
    {
      name: 'أحمد محمد',
      pending: 8,
      completed: 97,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: true
    },
    {
      name: 'سارة علي',
      pending: 5,
      completed: 42,
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      online: false
    },
    {
      name: 'يوسف إبراهيم',
      pending: 2,
      completed: 15,
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      online: true
    },
    {
      name: 'ليلى حسن',
      pending: 12,
      completed: 76,
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
      online: true
    },
    {
      name: 'خالد عمر',
      pending: 4,
      completed: 23,
      avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
      online: false
    }
  ];
  actions:any = [
    {
      views: 22,
      title: 'استقبال مريض في العياده وعمل فحص طبي له',
      subtitle: 'الاداره التنفيذية للمجمعات',
      logo: 'assets/clinic-logo.png'
    },
    {
      views: 22,
      title: 'استقبال مريض في العياده وعمل فحص طبي له',
      subtitle: 'الاداره التنفيذية للمجمعات',
      logo: 'assets/clinic-logo.png'
    },
    {
      views: 22,
      title: 'استقبال مريض في العياده وعمل فحص طبي له',
      subtitle: 'الاداره التنفيذية للمجمعات',
      logo: 'assets/clinic-logo.png'
    },
  ];
  mostActiveUsers = [
    {
      name: 'حاتم عبد الحميد السيد',
      email: 'info2933@gmail.com',
      rank: '2394',
      avatarInitials: 'WS'
    },
    {
      name: 'حاتم عبد الحميد السيد',
      email: 'info2933@gmail.com',
      rank: '2394',
      avatarInitials: 'WS'
    },
    {
      name: 'حاتم عبد الحميد السيد',
      email: 'info2933@gmail.com',
      rank: '2394',
      avatarInitials: 'WS'
    },
  ];
  
  pages = [1, 2, 3, 4, 5];
  currentPage = 1;
  
}
