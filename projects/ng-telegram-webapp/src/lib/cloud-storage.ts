import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { EMPTY, Subject } from 'rxjs';

export class CloudStorage {
  constructor(private readonly storage: TelegramWebApp.CloudStorage) {}

  /** Bot API 6.9+ A method that stores a value in the cloud storage using the specified key.
   *
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   *
   * The value should contain 0-4096 characters. You can store up to 1024 keys in the cloud storage.
   */
  setItem(key: string, value: string) {
    if (!this.storage) {
      return EMPTY;
    }

    const subject$ = new Subject<boolean>();

    this.storage.setItem(key, value, (error, success) => {
      if (error) {
        subject$.error(error);
      } else {
        subject$.next(success);
      }
      subject$.complete();
    });
    return subject$.asObservable();
  }

  /** Bot API 6.9+ A method that receives a value from the cloud storage using the specified key.
   *
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  getItem(key: string) {
    if (!this.storage) {
      return EMPTY;
    }
    const subject$ = new Subject<string>();

    this.storage.getItem(key, (error, value) => {
      if (error) {
        subject$.error(error);
      } else {
        subject$.next(value);
      }
      subject$.complete();
    });
    return subject$.asObservable();
  }

  /** Bot API 6.9+ A method that receives values from the cloud storage using the specified keys.
   *
   * The keys should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  getItems(keys: string[]) {
    if (!this.storage) {
      return EMPTY;
    }
    const subject$ = new Subject<Record<string, string>>();

    this.storage.getItems(keys, (error, values) => {
      if (error) {
        subject$.error(error);
      } else {
        subject$.next(values);
      }
      subject$.complete();
    });
    return subject$.asObservable();
  }

  /** Bot API 6.9+ A method that removes a value from the cloud storage using the specified key.
   *
   * The key should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  removeItem(key: string) {
    if (!this.storage) {
      return EMPTY;
    }
    const subject$ = new Subject<boolean>();

    this.storage.removeItem(key, (error, success) => {
      if (error) {
        subject$.error(error);
      } else {
        subject$.next(success);
      }
      subject$.complete();
    });
    return subject$.asObservable();
  }

  /**
   * Bot API 6.9+ A method that removes values from the cloud storage using the specified keys.
   *
   * The keys should contain 1-128 characters, only A-Z, a-z, 0-9, _ and - are allowed.
   */
  removeItems(keys: string[]) {
    if (!this.storage) {
      return EMPTY;
    }
    const subject$ = new Subject<boolean>();

    this.storage.removeItems(keys, (error, success) => {
      if (error) {
        subject$.error(error);
      } else {
        subject$.next(success);
      }
      subject$.complete();
    });
    return subject$.asObservable();
  }

  /**
   *  Bot API 6.9+ A method that receives the list of all keys stored in the cloud storage.
   */
  getKeys() {
    if (!this.storage) {
      return EMPTY;
    }
    const subject$ = new Subject<string[]>();

    this.storage.getKeys((error, keys) => {
      if (error) {
        subject$.error(error);
      } else {
        subject$.next(keys);
      }
      subject$.complete();
    });
    return subject$.asObservable();
  }
}
