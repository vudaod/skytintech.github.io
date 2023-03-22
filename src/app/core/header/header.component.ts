import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageFlag } from '@core/domain-classes/language-flag';
import { UserNotification } from '@core/domain-classes/notification';
import { UserAuth } from '@core/domain-classes/user-auth';
import { SecurityService } from '@core/security/security.service';
import { SignalrService } from '@core/services/signalr.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @ViewChild('selectElem', { static: true }) el: ElementRef;
  @Input()
  public lead: any;
  navbarOpen = false;
  appUserAuth: UserAuth = null;
  newNotificationCount = 0;
  notifications: UserNotification[] = [];
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: '../../../assets/images/flags/united-states.svg',
    },
    {
      lang: 'es',
      name: 'Spanish ',
      flag: '../../../assets/images/flags/brazil.svg',
    },
    {
      lang: 'fr',
      name: 'French ',
      flag: '../../../assets/images/flags/france.svg',
    },
    {
      lang: 'ar',
      name: 'Arabic ',
      flag: '../../../assets/images/flags/saudi-arabia.svg',
    },
    {
      lang: 'ru',
      name: 'Russian',
      flag: '../../../assets/images/flags/russia.svg',
    },
    {
      lang: 'ja',
      name: 'Japanese',
      flag: '../../../assets/images/flags/japan.svg',
    },
    {
      lang: 'ko',
      name: 'Korean',
      flag: '../../../assets/images/flags/south-korea.svg',
    },
    {
      lang: 'cn',
      name: 'Chinese',
      flag: '../../../assets/images/flags/china.svg',
    }
  ];
  constructor(
    private router: Router,
    private securityService: SecurityService,
    private notificationService: NotificationService,
    private signalrService: SignalrService,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.setTopLogAndName();
    this.subscribeToNotification();
    this.setDefaultLanguage()
  }

  setDefaultLanguage() {
    const lang = this.translationService.getSelectedLanguage();
    if (lang)
      this.setLanguageWithRefresh(lang);
  }


  setLanguageWithRefresh(lang: string) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
  }

  setNewLanguageRefresh(lang: string) {
    this.sub$.sink = this.translationService.setLanguage(lang).subscribe((response) => {
      this.setLanguageWithRefresh(response['LANGUAGE']);
    });
  }

  setTopLogAndName() {
    this.sub$.sink = this.securityService.SecurityObject.subscribe(c => {
      if (c) {
        this.appUserAuth = c;
      }
    })
  }

  public togglediv(): void {
    if (this.lead.className === 'toggled') {
      this.lead.className = '';
    } else {
      this.lead.className = 'toggled';
    }
  }

  onLogout(): void {
    this.securityService.logout();
    this.router.navigate(['/login']);
  }

  onMyProfile(): void {
    this.router.navigate(['/my-profile']);
  }

  subscribeToNotification() {
    this.sub$.sink = this.signalrService.userNotification$.subscribe(c => {
      this.getNotification();
    });
  }

  getNotification() {
    this.sub$.sink = this.notificationService.getNotification()
      .subscribe((notifications: UserNotification[]) => {
        this.newNotificationCount = notifications.filter(c => !c.isRead).length;
        this.notifications = notifications;
        this.cd.detectChanges();
      })
  }

  markAllAsReadNotification() {
    this.sub$.sink = this.notificationService.markAllAsRead().subscribe(() => {
      this.getNotification();
    });
  }

  viewNotification(notification: UserNotification) {
    if (!notification.isRead) {
      this.markAsReadNotification(notification.id);
    }
    this.router.navigate(['/', notification.documentId]);
  }

  markAsReadNotification(id) {
    this.sub$.sink = this.notificationService.markAsRead(id).subscribe(() => {
      this.getNotification();
    })
  }
}
