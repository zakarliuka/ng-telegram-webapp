import { InjectionToken } from '@angular/core';
import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';

export const TWA = new InjectionToken<TelegramWebApp.WebApp>(
  'instance of telegram webapp',
  {
    providedIn: 'root',
    factory: () => {
      if(!Telegram || !Telegram.WebApp){
        throw new Error('Telegram context not found. Initialize mini app first: https://core.telegram.org/bots/webapps#initializing-mini-apps');
      }

      return Telegram.WebApp;
    },
  }
);
