import { TelegramWebApp } from '@zakarliuka/tg-webapp-types';
import { TwaButton } from './button';

export class MainButton extends TwaButton<TelegramWebApp.MainButton> {
  /**
   * Current button text
   */
  get text() {
    return this.button.text;
  }

  /**
   * Current button color.
   */
  get color() {
    return this.button.color;
  }

  /**
   * Current button text color.
   */
  get textColor() {
    return this.button.textColor;
  }

  /**
   * Shows whether the button is visible. Set to false by default.
   */
  get isVisible() {
    return this.button.isVisible;
  }

  /**
   * Shows whether the button is active. Set to true by default.
   */
  get isActive() {
    return this.button.isActive;
  }

  /**
   *  Shows whether the button is displaying a loading indicator.
   */
  get isProgressVisible() {
    return this.button.isProgressVisible;
  }

  /** A method to set the button text.
   */
  setText(text: string) {
    this.button.setText(text);
    return this;
  }

  /**
   *  A method to enable the button.
   */
  enable() {
    this.button.enable();
    return this;
  }

  /**
   * A method to disable the button.
   */
  disable() {
    this.button.disable();
    return this;
  }

  /**
   * A method to show a loading indicator on the button.
   * @param leaveActive  when leaveActive=true is passed, the button remains enabled.
   */
  showProgress(leaveActive = false) {
    this.button.showProgress(leaveActive);
    return this;
  }

  /**
   *
   * Shows whether the button is active. Set to true by default.
   */
  hideProgress() {
    this.button.hideProgress();
    return this;
  }

  /** A method to set the button parameters. The params parameter is an object containing one or several fields that need to be changed:
   * - text - button text;
   * - color - button color;
   * - text_color - button text color;
   * - is_active - enable the button;
   * - is_visible - show the button.
   */
  setParams(params: {
    text: string;
    color: string;
    text_color: string;
    is_active: boolean;
    is_visible: boolean;
  }) {
    this.setParams(params);
    return this;
  }
}
