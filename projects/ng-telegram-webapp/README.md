# ng-telegram-webapp

This Angular library provides a set of tools to create Telegram WebApps with ease. It wraps the Telegram WebApp API in a convenient Angular service to streamline the development of your Telegram WebApp. For more information on Telegram Web Apps, please visit the [official documentation](https://core.telegram.org/bots/webapps).

## Prerequisites

Before using this library, you need to include the Telegram WebApp JavaScript API in your project. Add the following script tag to the `head` section of your `index.html` file:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

## Features

- Angular services for interacting with the Telegram WebApp API.
- Reactive event handling with RxJS observables.
- UI manipulation methods for the Telegram WebApp environment.
- Cloud storage utilities for Telegram data.
- Payment invoice handling for Telegram's payment system.
- QR code scanning functionality.

## Installation

Install the library using npm:

```bash
npm install @zakarliuka/ng-telegram-webapp --save
```

## Usage

### Service Injection

Inject the `TelegramWebappService` into your components to interact with the Telegram WebApp:

```typescript
import { Component, OnInit } from '@angular/core';
import { TelegramWebappService } from '@zakarliuka/ng-telegram-webapp';

@Component({
  selector: 'app-root',
  template: `<!-- Your template here -->`
})
export class AppComponent implements OnInit {
  private readonly telegramService = inject(TelegramWebappService)

  ngOnInit() {
    console.log(this.telegramService.initData);
  }
}
```

### Event Subscription

Subscribe to Telegram WebApp events using the service:

```typescript
this.telegramService.onEvent('mainButtonClicked').subscribe(() => {
  // Handle the main button click event
});
```

### UI Customization

Customize the WebApp UI using the service methods:

```typescript
this.telegramService.setHeaderColor('#FFFFFF');
```

## Examples

The `TelegramWebappService` provides a comprehensive interface to the Telegram WebApp API. Here are the features with corresponding code snippets:

### Initialization Data

Retrieve initialization data passed to the Mini App:

```typescript
// Raw data as a string
console.log(this.telegramService.initData);

// Object with input data
console.log(this.telegramService.initDataUnsafe);
```

### UI and Appearance

Access and modify the UI elements of the Telegram WebApp:

```typescript
// Access color scheme
console.log(this.telegramService.colorScheme);

// Set header color
this.telegramService.setHeaderColor('#FFFFFF');

// Set background color
this.telegramService.setBackgroundColor('#F0F0F0');
```

### App Control

Control the state and presentation of the Mini App:

```typescript
// Inform the Telegram app that the Mini App is ready
this.telegramService.ready();

// Expand the Mini App to the maximum height
this.telegramService.expand();

// Close the Mini App
this.telegramService.close();

// Enable confirmation dialog on close
this.telegramService.enableClosingConfirmation();

// Disable confirmation dialog on close
this.telegramService.disableClosingConfirmation();
```

### Event Handling

Handle events emitted by the Telegram WebApp:

```typescript
// Subscribe to the main button click event
this.telegramService.onEvent('mainButtonClicked').subscribe(() => {
  // Handle the event
});
```

### Data Management

Send data to the bot when the Mini App is closed:

```typescript
// Send data to the bot
this.telegramService.sendData({ key: 'value' });
```

### QR Code Scanning

Show and handle QR code scanning:

```typescript
// Show QR code scanner
this.telegramService.showScanQrPopup().subscribe((qrCodeText) => {
  console.log(qrCodeText);
  if(checkQr(qrCodeText)) {
    this.telegramService.closeScanQrPopup()
  }
});

```

### External Links

Open links externally or within the Telegram app:

```typescript
// Open an external link
this.telegramService.openLink('https://example.com');

// Open a link in the Telegram app
this.telegramService.openTelegramLink('https://t.me/example_bot');
```

### Payments

Handle payment invoices:

```typescript
// Open an invoice
this.telegramService.openInvoice('INVOICE_URL').subscribe((status) => {
  console.log(status);
});
```

### Popups and Alerts

Display popups and alerts to the user:

```typescript
// Show a popup
this.telegramService.showPopup({ message: 'Hello, World!' }).subscribe((buttonId) => {
  console.log(buttonId);
});

// Show an alert
this.telegramService.showAlert('Alert Message').subscribe(() => {
  // Alert dismissed
});

// Show a confirmation dialog
this.telegramService.showConfirm('Confirm this action?').subscribe((confirmed) => {
  console.log(confirmed);
});
```

### Permissions and Access

Request permissions or access to user data:

```typescript
// Request write access
this.telegramService.requestWriteAccess().subscribe((granted) => {
  console.log(granted);
});

// Request user's contact
this.telegramService.requestContact().subscribe((contact) => {
  console.log(contact);
});

// Read text from the clipboard
this.telegramService.readTextFromClipboard().subscribe((text) => {
  console.log(text);
});
```

### Inline Queries

Insert inline queries into the chat input field:

```typescript
// Switch to inline query
this.telegramService.switchInlineQuery('query');
```

### Device Features

Utilize device features like haptic feedback:

```typescript
// Trigger haptic feedback
this.telegramService.hapticFeedback.impactOccurred('light');
```

### Cloud Storage

Interact with Telegram's cloud storage:

```typescript
// Save data to cloud storage
this.telegramService.cloudStorage.set('key', 'value');

// Retrieve data from cloud storage
this.telegramService.cloudStorage.get('key').subscribe((value) => {
  console.log(value);
});
```

### UI Elements

Manage UI elements like the back and main buttons:

```typescript
this.telegramService.backButton.show().subscribe(() => {
  console.log('navigate back');
  this.telegramService.backButton.hide()
})

this.telegramService.mainButton.setText('Click Me');
this.telegramService.mainButton.show().subscribe(() => {
  console.log('main button clicked');
  this.telegramService.backButton.hide()
}) 
```

## Support

If you have any questions or encounter any issues, please feel free to [open an issue](https://github.com/telegram-webapp-types/issues) on our GitHub repository.

## License

This library is licensed under the MIT License. See the [LICENSE](https://github.com/zakarliuka/ng-telegram-webapp/blob/master/LICENSE) file for full details.
