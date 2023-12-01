import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';

export class HapticFeedback {
  constructor(private readonly haptic: TelegramWebApp.HapticFeedback) {}

  /**
   * Bot API 6.1+ A method tells that an impact occurred. The Telegram app may play the appropriate haptics based on the style value passed.
   */
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') {
    this.haptic.impactOccurred(style);
    return this;
  }

  /**
   * Bot API 6.1+ A method tells that a task or action has succeeded, failed, or produced a warning. The Telegram app may play the appropriate haptics based on the type value passed.
   */
  notificationOccurred(type: 'error' | 'success' | 'warning') {
    this.haptic.notificationOccurred(type);
    return this;
  }

  /**
   * Bot API 6.1+ A method tells that the user has changed a selection. The Telegram app may play the appropriate haptics.
   *
   * Do not use this feedback when the user makes or confirms a selection; use it only when the selection changes.
   */
  selectionChanged() {
    this.haptic.selectionChanged();
    return this;
  }
}
