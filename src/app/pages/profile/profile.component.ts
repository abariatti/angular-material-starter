import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  selectedUser = {
    name: 'John Doe',
    details: "I'm John Doe and I'm anonymous. Mysterious right? Well it gets even more mysterious. John Doe has no ...",
    isAdmin: false,
    isCool: true
  };

  ngOnInit() {
  }

}
