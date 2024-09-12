import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.service.getRole().subscribe((res: any) => {
      console.log('userData', res);
      this.service.user.next(res);
    });
  }
}
