import { Injectable, inject } from '@angular/core';
import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { Observable, Subject, finalize } from 'rxjs';
import { BackButton } from './back-button';
import { CloudStorage } from './cloud-storage';
import { HapticFeedback } from './haptic-feedback';
import { MainButton } from './main-button';
import { TWA } from './telegram-webapp.token';

type EventDataMap = {
  themeChanged: void;
  viewportChanged: { isStateStable: boolean };
  mainButtonClicked: void;
  backButtonClicked: void;
  settingsButtonClicked: void;
  invoiceClosed: TelegramWebApp.PaymentStatus;
  popupClosed: { button_id: string | null };
  qrTextReceived: { data: string };
  clipboardTextReceived: { data: string | null };
  writeAccessRequested: { status: 'allowed' | 'cancelled' };
  contactRequested: { status: 'sent' | 'cancelled' };
};

type ChatType = 'users' | 'bots' | 'groups' | 'channels';

@Injectable({
  providedIn: 'root',
})
export class TelegramWebappService {
  #scannerSubject: Subject<string> | null = null;

  readonly webApp = inject(TWA);

  readonly backButton = new BackButton(this.webApp.BackButton);
  readonly mainButton = new MainButton(this.webApp.MainButton);
  readonly hapticFeedback = new HapticFeedback(this.webApp.HapticFeedback);
  readonly cloudStorage = new CloudStorage(this.webApp.CloudStorage);

  /**
   * A string with raw data transferred to the Mini App, convenient for validating data.
   */
  get initData() {
    return this.webApp.initData;
  }

  /**
   * An object with input data transferred to the Mini App.
   */
  get initDataUnsafe() {
    return this.webApp.initDataUnsafe;
  }

  /**
   * The version of the Bot API available in the user's Telegram app.
   */
  get webappVersion() {
    return this.webApp.version;
  }

  /**
   * The name of the platform of the user's Telegram app.
   */
  get platform() {
    return this.webApp.platform;
  }

  /**
   * The color scheme currently used in the Telegram app. Either "light" or "dark". Also available as the CSS variable var(--tg-color-scheme).
   */
  get colorScheme() {
    return this.webApp.colorScheme;
  }

  /**
   * An object containing the current theme settings used in the Telegram app.
   */
  get themeParams() {
    return this.webApp.themeParams;
  }

  /**
   * True, if the Mini App is expanded to the maximum available height. False, if the Mini App occupies part of the screen and can be expanded to the full height using the expand() method.
   */
  get isExpanded() {
    return this.webApp.isExpanded;
  }

  /**
   * The current height of the visible area of the Mini App. Also available in CSS as the variable var(--tg-viewport-height).
   */
  get viewportHeight() {
    return this.webApp.viewportHeight;
  }

  /**
   * The height of the visible area of the Mini App in its last stable state. Also available in CSS as a variable var(--tg-viewport-stable-height).
   */
  get viewportStableHeight() {
    return this.webApp.viewportStableHeight;
  }

  /**
   * Current header color in the #RRGGBB format.
   */
  get headerColor() {
    return this.webApp.headerColor;
  }

  /**
   * Current background color in the #RRGGBB format.
   */
  get backgroundColor() {
    return this.webApp.backgroundColor;
  }

  /**
   * True, if the confirmation dialog is enabled while the user is trying to close the Mini App. False, if the confirmation dialog is disabled.
   */
  get isClosingConfirmationEnabled() {
    return this.webApp.isClosingConfirmationEnabled;
  }

  /**
   * A method that informs the Telegram app that the Mini App is ready to be displayed.
   */
  ready() {
    this.webApp.ready();
  }

  /**
   * A method that expands the Mini App to the maximum available height.
   */
  expand() {
    if (this.webApp && !this.webApp.isExpanded) {
      this.webApp.expand();
    }
  }

  /**
   * A method that closes the Mini App.
   */
  close() {
    this.webApp.close();
  }

  /**
   * Function that sets the app event handler.
   * @param event - The mini app events. {@link https://core.telegram.org/bots/webapps#events-available-for-mini-apps list of available events}
   * @returns a data depends on event type
   */
  onEvent<T extends keyof EventDataMap>(event: T): Observable<EventDataMap[T]> {
    const subject$ = new Subject<EventDataMap[T]>();
    const cb = (val: EventDataMap[T]) => {
      subject$.next(val);
    };

    this.webApp.onEvent(event, cb);
    return new Observable<EventDataMap[T]>((subscriber) => {
      const subscription = subject$
        .asObservable()
        .pipe(
          finalize(() => {
            this.webApp.offEvent(event, cb);
          })
        )
        .subscribe(subscriber);
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  /**
   *  Function that sets the app header color in the #RRGGBB format.
   */
  setHeaderColor(color: string) {
    this.webApp.setHeaderColor(color);
  }

  /**
   *  Function that sets the app background color in the #RRGGBB format.
   */
  setBackgroundColor(color: string) {
    this.webApp.setBackgroundColor(color);
  }

  /**
   * Function that enables a confirmation dialog while the user is trying to close the Mini App.
   */
  enableClosingConfirmation() {
    this.webApp.enableClosingConfirmation();
  }

  /**
   * Function that disables the confirmation dialog while the user is trying to close the Mini App.
   */
  disableClosingConfirmation() {
    this.webApp.disableClosingConfirmation();
  }

  /**
   * Function used to send data to the bot. When this method is called, a
   * service message is sent to the bot containing the data data of the length
   * up to 4096 bytes, and the Mini App is closed. See the field web_app_data
   * in the class Message. This method is only available for Mini Apps launched
   * via a Keyboard button.
   */
  sendData(data: object | string | number | boolean | undefined) {
    const payload = JSON.stringify(data || '');
    this.webApp.sendData(payload);
  }

  /**
   * Function that shows a native popup for scanning a QR code described by the params argument of the type ScanQrPopupParams.
   */
  showScanQrPopup(params: TelegramWebApp.ScanQrPopupParams = {}) {
    if (!this.#scannerSubject) {
      this.#scannerSubject = new Subject<string>();

      this.webApp.showScanQrPopup(params, (text: string) => {
        this.#scannerSubject?.next(text);
      });
    }
    return this.#scannerSubject;
  }

  /**
   * Function that closes the native popup for scanning a QR code opened with the showScanQrPopup method.
   */
  closeScanQrPopup() {
    this.#scannerSubject?.complete();
    this.#scannerSubject = null;

    this.webApp.closeScanQrPopup();
  }

  /**
   * Function that opens a link in an external browser.
   */
  openLink(url: string, options?: { try_instant_view: boolean }) {
    this.webApp.openLink(url, options);
  }

  /**
   * Function that opens a telegram link inside Telegram app. The Mini App will be closed.
   */
  openTelegramLink(url: string) {
    return this.webApp.openTelegramLink(url);
  }

  /**
   * Function that opens an invoice using the link url.
   */
  openInvoice(url: string) {
    const subject$ = new Subject<TelegramWebApp.PaymentStatus>();

    this.webApp.openInvoice(url, (status: TelegramWebApp.PaymentStatus) => {
      subject$.next(status);
      subject$.complete();
    });

    return subject$.asObservable();
  }

  /**
   * Function that shows a native popup described by the params argument of the type PopupParams.
   */
  showPopup(params: TelegramWebApp.PopupParams) {
    const subject$ = new Subject<string>();

    this.webApp.showPopup(params, (buttonId: string) => {
      subject$.next(buttonId);
      subject$.complete();
    });

    return subject$.asObservable();
  }

  /**
   * Function that shows a native popup described by the params argument of the type PopupParams.
   */
  showAlert(msg: string) {
    const subject$ = new Subject<void>();

    this.webApp.showAlert(msg, () => {
      subject$.next();
      subject$.complete();
    });

    return subject$.asObservable();
  }

  /**
   * Function that shows message in a simple confirmation window with 'OK' and 'Cancel' buttons.
   */
  showConfirm(msg: string) {
    const subject$ = new Subject<boolean>();

    this.webApp.showConfirm(msg, (val: boolean) => {
      subject$.next(val);
      subject$.complete();
    });

    return subject$.asObservable();
  }

  /**
   *
Function that shows a native popup requesting permission for the bot to send messages to the user.
   */
  requestWriteAccess() {
    const subject$ = new Subject<boolean>();

    this.webApp.requestWriteAccess((val: boolean) => {
      subject$.next(val);
      subject$.complete();
    });

    return subject$.asObservable();
  }

  /**
   * Function that inserts the bot's username and the specified inline query in the current chat's input field.
   */
  switchInlineQuery(query: string = '', chatTypes?: ChatType[] | undefined) {
    this.webApp.switchInlineQuery(query, chatTypes);
  }

  /**
   * Function that shows a native popup prompting the user for their phone number.
   */
  requestContact() {
    const subject$ = new Subject<boolean>();

    this.webApp.requestContact((val: boolean) => {
      subject$.next(val);
      subject$.complete();
    });

    return subject$.asObservable();
  }

  /**
   *  Function that requests text from the clipboard.
   */
  readTextFromClipboard() {
    return new Observable<string | null>((subscriber) => {
      this.webApp.readTextFromClipboard((val: string | null) => {
        subscriber.next(val);
        subscriber.complete();
      });
    });
  }
}
