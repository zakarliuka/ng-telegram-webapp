import { Component, OnInit, inject } from '@angular/core';
import { TelegramWebappService } from 'ng-telegram-webapp';
import { delay, filter, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly #twa = inject(TelegramWebappService);

  readTextFromClipboard() {
    this.#twa
      .readTextFromClipboard()
      .subscribe((v) => this.#twa.showAlert(v || 'noting'));
  }

  startQr() {
    this.#twa.showScanQrPopup().subscribe((value) => {
      this.#twa.closeScanQrPopup();
      this.#twa.showAlert(value);
    });
  }

  openLink() {
    this.#twa.openLink('https://google.com');
  }
  showConfirm() {
    this.#twa.showConfirm('hello confirm').subscribe((val) => {
      this.#twa.showAlert(val ? 'true' : 'false');
    });
  }
  showAlert() {
    this.#twa.showAlert('hello world');
  }

  ngOnInit(): void {
    this.#twa.expand();
    this.#twa.mainButton.setText('hellworld');
    this.#twa.onEvent('popupClosed').pipe(take(1)).subscribe(console.log);
  }

  showPopup() {
    this.#twa
      .showPopup({
        message: 'hello world',
        title: 'hi there',
        buttons: [
          {
            id: 'qwer',
            text: 'hello btn',
            type: 'default',
          },
          {
            id: 'qwer1',
            text: 'destructive',
            type: 'destructive',
          },
          {
            id: 'qwer2',
            text: 'cancel btn',
            type: 'cancel',
          },
        ],
      })
      .subscribe(console.log);
  }

  showMainBtn() {
    this.#twa.mainButton
      .show()
      .pipe(
        tap(() => {
          this.#twa.mainButton.showProgress(false);
        }),
        delay(1000)
      )
      .subscribe({
        next: () => {
          this;
          this.#twa.showAlert('main button event');
          this.#twa.mainButton.hide();
        },
        complete: () => console.log('complete main'),
      });
  }

  showBackBtn() {
    let counter = 0;
    if (this.#twa.backButton.isVisible) {
      return;
    }
    this.#twa.backButton
      .show()
      .pipe(
        switchMap(() => this.#twa.showConfirm('Are you sure?')),
        filter(Boolean)
      )
      .subscribe({
        next: () => {
          this.#twa.backButton.hide();
        },
        complete: () => {
          this.#twa.showAlert('completed!');
        },
      });
  }

  handleClose() {
    console.log('close!!');
    this.#twa.close();
  }
}
