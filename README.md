# Order Book widget functionality from the Trading page of the Bitfinex website

## General Requirements
- The widget should conceptually be the same as the corresponding widgets on the Bitfinex website.
- It should show the data in real time and should have the ability to recover after a lost network connection.
- You can add some controls to manage the WebSocket connection such as "Connect" and "Disconnect" buttons.

## Technological Requirements
* Use React for rendering and Redux to store the market data.
* Feel free to create a custom CSS style for the widgets, it can be very simple.
* Use Bitfinex WebSocket V2 API to obtain the data.