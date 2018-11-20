import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../shared/services';
import { HandleRedirectionService } from '../../services';

@Component({
  template: require('./template.pug')(),
  styles: [require('./styles.styl').toString()]
})
export class LoginComponent implements OnInit {

  // Attributes
  credentials: any;

  // Methods
  constructor (
    private resources: ResourcesService,
    private redirectionHandler: HandleRedirectionService
  ) {
    this.credentials = {};
  }

  ngOnInit () {}

  login () {
    this.resources.loginUsingEmailPassword(
      this.credentials.email,
      this.credentials.password
    ).subscribe((user) => {
      console.log('Login successful', user);
      this.redirectionHandler.resolveRedirection();
    }, (resp) => {
      console.warn('Error on login', resp);
    });
  }

}
