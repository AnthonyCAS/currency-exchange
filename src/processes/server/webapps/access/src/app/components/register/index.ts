import {Component} from '@angular/core';
import {ResourcesService} from '../../shared/services'
import {HandleRedirectionService} from '../../services'

@Component({
  template: require('./template.pug')(),
  styles: [require('./styles.styl').toString()]
})
export class RegisterComponent {

  // Attributes
  user: any

  // Methods
  constructor (
    private resources: ResourcesService,
    private redirectionHandler: HandleRedirectionService
  ) {
    this.user = {};
  }

  register () {
    this.resources.registerPersonWithEmailPassword({
      email: this.user.email
    }, this.user.password).subscribe((resp) => {
      // alert('Registered!');
      console.log('User registerd', resp);
      this.redirectionHandler.resolveRedirection();
    }, (err) => {
      alert('Error registering user');
      console.warn('Error on register user', err);
    })
  }

}