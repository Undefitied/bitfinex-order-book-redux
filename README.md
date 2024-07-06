### Implementation notes
* Note some "TODO" in the code, mostly regarding API for which I couldn't find answers in the docs;
* I am using global CSS file because it is more convenient (faster) for small apps like this one; I would normally use css modules in react, eg: `import styles from './styles.module.css';`;
* I am not using constants for error and info messages, which would normally come from a localization framework;
* I am opting for using the coding style without semicolons and using single quotes but now there may be inconsistencies, I didn't install eslint or fixed them manually because of the limited time;
* ... please let me know if you have any questions;

# Order Book widget functionality from the Trading page of the Bitfinex website

## General Requirements
- The widget should conceptually be the same as the corresponding widgets on the Bitfinex website.
- It should show the data in real time and should have the ability to recover after a lost network connection.
- You can add some controls to manage the WebSocket connection such as "Connect" and "Disconnect" buttons.

## Technological Requirements
* Use React for rendering and Redux to store the market data.
* Feel free to create a custom CSS style for the widgets, it can be very simple.
* Use Bitfinex WebSocket V2 API to obtain the data.