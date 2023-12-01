import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { Observable } from 'rxjs';

export class CloudStorage {
  constructor(private readonly storage: TelegramWebApp.CloudStorage) {}

  /**
   * Bot API 6.9+ A method that stores a value in the cloud storage using the specified key.
   *
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   *
   * The value should contain 0-4096 characters. You can store up to 1024 keys in the cloud storage.
   */
  setItem(key: string, value: string) {
    return new Observable<boolean>(subscriber => {
      this.storage.setItem(key, value, (error, success) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(success);
        subscriber.complete();
      });
    });
  }

  /**
   * Bot API 6.9+ A method that receives a value from the cloud storage using the specified key.
   *
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  getItem(key: string) {
    return new Observable(subscriber => {
      this.storage.getItem(key, (error, value) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(value);
        subscriber.complete();
      });
    })
  }

  /**
   * Bot API 6.9+ A method that receives values from the cloud storage using the specified keys.
   *
   * The keys should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  getItems<T extends string>(keys: T[]) {
    return new Observable<Record<T, string>>(subscriber => {
      this.storage.getItems(keys, (error, values) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(values);
        subscriber.complete();
      });
    })
  }

  /**
   * Bot API 6.9+ A method that removes a value from the cloud storage using the specified key.
   *
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  removeItem(key: string) {
    return new Observable<boolean>(subscriber => {
      this.storage.removeItem(key, (error, success) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(success);
        subscriber.complete();
      });
    });
  }

  /**
   * Bot API 6.9+ A method that removes values from the cloud storage using the specified keys.
   *
   * The keys should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  removeItems(keys: string[]) {
    return new Observable<boolean>(subscriber => {
      this.storage.removeItems(keys, (error, success) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(success);
        subscriber.complete();
      });
    });
  }

  /**
   *  Bot API 6.9+ A method that receives the list of all keys stored in the cloud storage.
   */
  getKeys() {
    return new Observable<string[]>(subscriber => {
      this.storage.getKeys((error, keys) => {
        if (error) {
          subscriber.error(error);
          return;
        }

        subscriber.next(keys);
        subscriber.complete();
      });
    });
  }
}
