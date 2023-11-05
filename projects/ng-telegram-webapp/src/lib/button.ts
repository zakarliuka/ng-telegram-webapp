import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { EMPTY, Subject } from 'rxjs';

export abstract class TwaButton<
  T extends TelegramWebApp.MainButton | TelegramWebApp.BackButton
> {
  #clickSubject: Subject<void> | null = null;

  constructor(protected readonly button: T) {}

  private handleOnClick = () => {
    this.#clickSubject?.next();
  };

  /**
   *  A method to make the button active and visible.
   */
  show() {
    if (!this.button) {
      return EMPTY;
    }

    if (this.#clickSubject) {
      this.#clickSubject.complete();
    }

    this.#clickSubject = new Subject();

    this.button.show().onClick(this.handleOnClick);
    return this.#clickSubject.asObservable();
  }

  /**
   *  A method to hide the button.
   */
  hide() {
    this.button?.offClick(this.handleOnClick);
    this.button?.hide();

    this.#clickSubject?.complete();
    this.#clickSubject = null;
  }
}
