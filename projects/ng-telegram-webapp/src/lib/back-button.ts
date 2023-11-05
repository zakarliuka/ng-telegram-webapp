import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { TwaButton } from './button';

export class BackButton extends TwaButton<TelegramWebApp.BackButton> {
  get isVisible() {
    return this.button.isVisible;
  }
}
