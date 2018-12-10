import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShareDataService } from '../../services/share-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private accToggle: boolean = false;
  private navToggle: boolean = false;
  selectedLanguage: string;
  constructor(private translate: TranslateService,
    private shareDataService: ShareDataService,
    private auth: AuthService) {
    translate.setDefaultLang('en');
  }
  searchResultHeader: boolean;

  private hideProfile: Boolean;

  ngOnInit() {
    this.shareDataService.currentsearchResultHeader.subscribe(searchResultHeader => this.searchResultHeader = searchResultHeader);
    this.setLanguage(localStorage.getItem('selectedLanguage') || 'en');

    this.auth.refreshHeaderSubject.subscribe((hide) => {
      this.hideProfile = hide;
    });
  }

  isAuth() {
    return this.auth.isAuthenticated();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this['searchToggle']) {
    this['searchToggle'] = !this['searchToggle']
    }
  }

  toggleHandler(toggleKey) {
    this[toggleKey] = !this[toggleKey];
  }

  scrollToBottom(elemId: string): void {
    setTimeout(() => {
      const element = document.getElementById(elemId);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, null);
  }

  setLanguage(language: string) {
    this.selectedLanguage = language;
    localStorage.setItem('selectedLanguage', language);
    this.translate.use(language);
  }
}
