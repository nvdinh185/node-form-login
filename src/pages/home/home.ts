import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../../components/register/register'
import { LoginPage } from '../../components/login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
  login() {
    this.navCtrl.push(LoginPage);
  }

}
