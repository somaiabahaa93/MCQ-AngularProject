import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  students: any[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  getAllStudents() {
    this.service.getUsers('students').subscribe((res: any) => {
      this.students = res;
      console.log('allStudents', this.students);
    });
  }

  submit() {
    console.log('form', this.form.value);
    const index = this.students.findIndex(
      (item) => item.email == this.form.value.email
    );
    if (index !== -1) {
      this.toastr.error('هذا الايميل موجود مسبقا');
    } else {
      const modal = this.form.value;
      this.service.register(modal).subscribe((res) => {
        console.log('res', res);
        this.toastr.success('تم انشاء الحساب');
        this.router.navigate(['/subjects']);
      });
    }
  }
}
