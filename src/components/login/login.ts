import { Component, ViewChild } from '@angular/core';
import { Slides, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;
  slideIndex = 0;

  isDesktop: boolean = false;

  users: any = [];
  UserInfo = { fullname: '', image: '' };

  loginForm: FormGroup;

  slidePages = {
    home: 0,
    info: 1
  }

  constructor(private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    console.log("platform", this.platform.platforms());
    this.isDesktop = this.platform.is('core');
    if (this.isDesktop) {
      console.log('Đây là giao diện web ở trên trình duyệt!');
    }


    this.slides.lockSwipes(true);
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  loginStatus;
  registerStatus;


  login() {
    var promise = new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        content: 'Đang kiểm tra đăng nhập...'
      });
      let user = this.loginForm.value;
      const url = 'http://localhost:8080/db/json-user';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(user);
      loading.present();
      this.httpClient.post(url, body, { headers })
        .toPromise()
        .then(data => {
          resolve(data);
          //console.log(data);
        })
        .catch(err => {
          reject(err);
          //console.log(err);
        });
      loading.dismiss();
    })
    promise.then(data => {
      this.loginStatus = JSON.stringify(data);
      if (this.loginStatus == "1") {
        this.getFromServer();
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    }).catch(err => {
      console.log('err', err);
    })
  }

  //lien quan den slide pages

  goToSlide(i) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(i, 500);
    this.slides.lockSwipes(true);
  }

  slideChanged() {
    this.slideIndex = this.slides.getActiveIndex();
  }

  goBack() {
    this.goToSlide(0);
  }

  getFromServer() {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8080/db/get-users')
        .toPromise()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        })
    });
    promise.then(data => {
      this.users = data;
      this.goToSlide(this.slidePages.info);
    });
  }
}
