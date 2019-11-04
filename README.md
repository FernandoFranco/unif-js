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

      .unif-section {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div id="home" class="unif-section" style="background: #2196F3">
      <h1>Page 1</h1>
    </div>
    <div class="unif-section" style="background: #4CAF50">
      <h1>Page 2</h1>
    </div>
    <div class="unif-section" style="background: #F44336">
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
  sectionSelector: '.unif-section', // Change section query selector
  disableHash: false, // Disable hash watch and change in url
  disableWheel: false, // Disable wheel events
  disableTouch: false, // Disable touch events
  disableKeys: false, // Disable all keys events
  disableArrowKeys: false, // Disable arrows up and down keys
  disablePageKeys: false, // Disable page up and down keys
  disableSpaceBarKey: false, // Disable space bar key
  disableHomeEndKeys: false, // Disable home and end keys
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
```
