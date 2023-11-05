import { InjectionToken } from '@angular/core';
import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';

export const TWA = new InjectionToken<TelegramWebApp.WebApp>(
  'instance of telegram webapp',
  {
    providedIn: 'root',
    factory: () => {
      return Telegram.WebApp;
    },
  }
);
