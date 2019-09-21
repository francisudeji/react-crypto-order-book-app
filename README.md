## React Crypto Order Book App

**TL:DR**

This app has a dropdown of currency pairs (e.g. USD/BTC)

When user selects an item from the list, the app will show streaming order books (lists of bids and asks) for the pair.

When a new item is selected from the list, the previous item will be unsubscribed from the current order book, and newly selected one will be subscribed.

### Technologies

- [React](https://github.com/facebook/create-react-app)
- [TailwindCSS](https://tailwindcss.com)
- [Downshift](https://github.com/downshift-js/downshift)

### How to run

- Clone this repo by running `git clone https://github.com/francisudeji/react-crypto-order-book-app.git` in your terminal or by downloading manually.
- `cd` into the project folder
- Run `npm install` or `yarn` to install dependencies, I used yarn.
- Wait for development server to kickoff and visit https://localhost:3000 to see the app.

### External Links

Bitstamp API for trading pairs: https://www.bitstamp.net/api/v2/trading-pairs-info/

Bitstamp streaming API: https://www.bitstamp.net/websocket/v2/
