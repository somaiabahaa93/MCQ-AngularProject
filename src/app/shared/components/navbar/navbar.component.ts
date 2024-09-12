import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any = null;
  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.service.user.subscribe((res: any) => {
      if (res.role) {
        this.user = res;
        console.log('user>>>>', res);
      }
    });
  }

  logout() {
    const model = {};
    this.service.login(model).subscribe((res) => {
      this.service.user.next(res);
      this.user = null;
    });
  }
}
