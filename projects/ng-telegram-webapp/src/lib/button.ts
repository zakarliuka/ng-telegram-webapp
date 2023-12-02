import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { Observable } from 'rxjs';

export abstract class TwaButton<
  T extends TelegramWebApp.MainButton | TelegramWebApp.BackButton
> {

  public readonly clicks$: Observable<void>;

  constructor(protected readonly button: T) {
    this.clicks$ = new Observable<void>(subscriber => {
      const clickHandler = subscriber.next.bind(subscriber);
      button.onClick(clickHandler);

      return () => {
        button.offClick(clickHandler);
      };
    });
  }

  /**
   *  A method to make the button active and visible.
   */
  show() {
    this.button.show();
  }

  /**
   *  A method to hide the button.
   */
  hide() {
    this.button.hide();
  }
}
