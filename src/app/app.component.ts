import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public translate: TranslateService) {
    translate.addLangs(['ru', 'en']);
    translate.setDefaultLang('ru');

  }

  ngOnInit() {

  }
}
