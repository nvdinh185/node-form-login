import { Component, ViewChild } from '@angular/core';
import { Slides, LoadingController, Platform, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;
  slideIndex = 0;

  isDesktop: boolean = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  slidePages = {
    home: 0,
    register: 1,
    signature: 2,
    info: 3
  }

  constructor(private navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    console.log("platform", this.platform.platforms());
    this.isDesktop = this.platform.is('core');
    if(this.isDesktop){
      console.log('Đây là giao diện web ở trên trình duyệt!');
    }


    this.slides.lockSwipes(true);
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });

    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  loginStatus;
  registerStatus;


  confirm() {
    var promise = new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        content: 'Đang kiểm tra username...'
      });
      let username = this.loginForm.value;
      const url = 'http://localhost:8080/db/confirm';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(username);
      loading.present();
      this.httpClient.post(url, body, { headers })
        .toPromise()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
      loading.dismiss();
    })
    promise.then(data => {
      this.loginStatus = JSON.stringify(data);
      if (this.loginStatus == "1") {
        this.goToSlide(this.slidePages.register);
      } else {
        alert("Sai tên đăng nhập!");
      }
    }).catch(err => {
      console.log('err', err);
    })
  }

  nhapThongTin() {
    this.goToSlide(this.slidePages.signature);
  }

  image = "";

  register(img_src) {
    let loading = this.loadingCtrl.create({
      content: 'Đang đăng ký...'
    });
    let info = this.registerForm.value;
    info.username = this.loginForm.value.username;
    info.image = img_src;
    const url = 'http://localhost:8080/db/register';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(info);
    loading.present();
    this.httpClient.post(url, body, { headers })
      .toPromise()
      .then(data => {
        this.registerStatus = JSON.stringify(data);
        if (this.registerStatus == "1") {
          alert("Đã đăng ký thành công!");
        } else {
          alert("Đăng ký thất bại!");
        }
        this.navCtrl.pop();
      })
      .catch(err => {
        alert("Xảy ra lỗi trong quá trình post lên server!");
      });
    loading.dismiss();
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
}
