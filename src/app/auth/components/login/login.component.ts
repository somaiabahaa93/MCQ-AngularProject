import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  type = 'students';
  users: any[] = [];
  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type: [this.type, Validators.required],
    });
  }
  getValue(e: any) {
    this.type = e.value;
    this.getUsers();
  }

  getUsers() {
    this.service.getUsers(this.type).subscribe((res: any) => {
      this.users = res;
      console.log('users', this.users);
    });
  }
  login() {
    const index = this.users.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (index == -1) {
      this.toastr.error('الايميل او كلمه السر غير صحيحه');
    } else {
      const model = {
        username: this.users[index].username,
        role: this.type,
        // userId: this.users[index].id,
      };
      this.service.login(model).subscribe((res) => {
        this.service.user.next(res);
        this.toastr.success(' تم الدخول بنجاح');
        this.router.navigate(['/subjects']);
      });
    }
  }
}
