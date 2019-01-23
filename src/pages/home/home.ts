import { Component, ViewChild } from '@angular/core';
import { Slides, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  slideIndex = 0;

  users: any = [];

  loginForm: FormGroup;

  slidePages = {
    home: 0,
    confirm: 1,
    register: 2,
    list: 4
  }

  constructor(private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]]
    })
  }

  status;
  loading = this.loadingCtrl.create({
    content: 'Đang kiểm tra đăng nhập...'
  });


  login() {
    this.postToServer();

    setTimeout(() => {
      if (this.status == "1") {
        this.getFromServer();
        this.goToSlide(this.slidePages.list);
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    }, 1000)
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
    this.httpClient.get('http://localhost:8080/excel/json-users')
      .toPromise()
      .then(data => {
        this.users = data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  postToServer() {
    let username = this.loginForm.value;
    const url = 'http://localhost:8080/db/json-user';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(username);
    this.loading.present();
    this.httpClient.post(url, body, { headers })
      .toPromise()
      .then(data => {
        this.status = JSON.stringify(data);
      })
      .catch(err => {
        console.log(err);
      });
    this.loading.dismiss();
  }
}
