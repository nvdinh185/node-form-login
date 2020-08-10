import { Component } from '@angular/core';
import { AuthService, CommonsService, DynamicFormMobilePage } from 'ngxi4-dynamic-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private apiCommons: CommonsService
    , private apiAuth: AuthService
  ) {}

  /**
   * Gọi chức năng login
   */
  login() {

    let form = {
      title: 'Login'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { type: 'title', name: 'Nhập user của email @mobifone.vn' }
        ,
        // form login gồm nhập username và password
        { type: 'text', key: 'username', name: 'Tên đăng nhập:', hint: 'Vui lòng nhập tên đăng nhập!', icon: 'contact', validators: [{ required: true, min: 1, max: 30 }] }
        , { type: "password", key: "password", name: "Mật khẩu", hint: "Vui lòng nhập mật khẩu!", icon: "key", validators: [{ required: true, min: 1, max: 20 }] }
        ,
        {
          type: 'button'
          , options: [
            {
              name: 'Đăng nhập'
              , next: 'CALLBACK'
              , url: this.apiAuth.serviceUrls.AUTH_SERVER + '/login'
              , command: 'LOGIN'
            }
          ]
        }
      ]
    }

    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,
        callback: this.callbackLogin,
        form: form
      }
    );

  }

  /**
   * Hàm gọi lại cho form popup
   */
  callbackLogin = function (res) {
    return new Promise(resolve => {
      console.log(res);
      if (res.error) {
        this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
      } else if (res.response_data) {

      }

      // close form
      resolve({ next: "CLOSE" });
    });
  }.bind(this);
}
