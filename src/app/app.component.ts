import { Component, OnInit } from '@angular/core';
import { OnlineUser } from '@core/domain-classes/online-user';
import { UserAuth } from '@core/domain-classes/user-auth';
import { SecurityService } from '@core/security/security.service';
import { SignalrService } from '@core/services/signalr.service';
import { TranslationService } from '@core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'document-management';
  /**
   *
   */
  constructor(
    private signalrService: SignalrService,
    private securityService: SecurityService,
    public translate: TranslateService,
    private translationService: TranslationService
  ) {
    super();
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    this.setLanguage();
  }

  setLanguage() {
    const currentLang = this.translationService.getSelectedLanguage();
    if (currentLang) {
      this.sub$.sink = this.translationService.setLanguage(currentLang)
      .subscribe(() => { });
    }
    else {
      const browserLang = this.translate.getBrowserLang();
      const lang = browserLang.match(/en|es|ar|ru|cn|ja|ko|fr/) ? browserLang : 'en';
      this.sub$.sink = this.translationService.setLanguage(lang).subscribe(() => { });
    }
  }

  ngOnInit(): void {
    this.signalrService.startConnection().then(resolve => {
      if (resolve) {
        this.signalrService.handleMessage();
        this.getAuthObj();
      }
    });
  }

  getAuthObj() {
    this.sub$.sink = this.securityService.SecurityObject
      .subscribe((c: UserAuth) => {
        if (c) {
          const online: OnlineUser = {
            email: c.email,
            id: c.id,
            connectionId: this.signalrService.connectionId
          };
          this.signalrService.addUser(online);
        }
      });
  }
}
