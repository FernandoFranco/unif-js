# unif-js
UnifJS is a similar FullPage solution

# Install

```cmd
// NPM
npm install unif-js --save

// YARN
yarn add unif-js
```

# Basic use

Simple HTML to use unif.js

```html
<!doctype html>
<html>
  <head>
    <title>UnifJS</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <style>
      html {
        height: 100%;
      }

      body {
        margin: 0;
        height: 100%;
        overflow: hidden;
      }

      h1 {
        margin: 0;
        color: #fff;
      }

      .unif-session {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div id="home" class="unif-session" style="background: #2196F3">
      <h1>Page 1</h1>
    </div>
    <div class="unif-session" style="background: #4CAF50">
      <h1>Page 2</h1>
    </div>
    <div class="unif-session" style="background: #F44336">
      <h1>Page 3</h1>
    </div>

    <script src="./unif.js"></script>
    <script>
      new UnifJS('body');
    </script>
  </body>
</html>
```

# Configurations

```javascript
var containerQuerySelector = 'body';
var configObject = {
  sessionSelector: '.unif-session', // Change session query selector
  disableHash: false, // Disable hash watch and change in url
  disableWheel: false, // Disable wheel events
  disableTouch: false, // Disable touch events
  disableKeys: false, // Disable all keys events
  disableArrowKeys: false, // Disable arrows up and down keys
  disablePageKeys: false, // Disable page up and down keys
  disableSpaceBarKey: false, // Disable space bar key
  disableHomeEndKeys: false, // Disable home and end keys
  minTouchMove: 50, // Min touch move diff to scroll
  onScroll: function () {}, // On Scroll event handler
};

new UnifJS(containerQuerySelector, configObject);
```

# Extra Methods

```javascript
var unif = new UnifJS('body');

setTimeout(function () {
  unif.stop(); // Stop all events of unif
}, 5000);

setTimeout(function () {
  unif.start(); // Start all events of unif
}, 10000);

setTimeout(function () {
  unif.setConfig('configKey', configValue); // Update the config key
}, 15000);

setTimeout(function () {
  unif.setSession(sessionIdentifier); // Session identifier like index or id
}, 20000);
```
