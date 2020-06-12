import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.page.html',
  styleUrls: ['./user-role.page.scss'],
})
export class UserRolePage implements OnInit {
  userData: User[] = [];
  uploadForm: FormGroup;

  constructor(private us: UserService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userData = JSON.parse(res.value);
      console.log(this.userData);
    });
  }

  ngOnInit() {
    this.formulier();
  }

  uploadSubmit() {
    // console.log(this.uploadForm.value);

    this.us.putUser(this.uploadForm.get('id').value, this.uploadForm.value).subscribe((user) => {
      console.log(user);
    });

    this.router.navigate(['/user-manage']);
  }

  formulier() {
    
    this.uploadForm = this.fb.group({
      id: [this.userData["id"]],
      name: [this.userData["name"]],
      role: [this.userData["role"]],
    });
  }


  get ids() { return this.uploadForm.get("id") };
  get name() { return this.uploadForm.get("name") };
  get role() { return this.uploadForm.get("role") };
}
