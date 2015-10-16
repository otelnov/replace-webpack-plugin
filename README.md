# replace-webpack-plugin
### Replace blocks in HTML for [Webpack](https://webpack.github.io/)

### Install

`
npm i --save replace-webpack-plugin
`

To replace html content with provided string, just wrap your content with comment like this:

```html
<!-- replace:[name] -->
  blocks you want to replace
<!-- endreplace -->
```

### API

- **skip** `Boolean` if true - original content will be left (default false)
- **entry** `String` original file
- **output** `String` new file with replaced data
- **data** `Object` key-value pair of block identifier and new string

### Example

```javascript
//webpack.config.js
var ReplacePlugin = require('replace-webpack-plugin');
var config = {
  ...
  plugins: [
    new ReplacePlugin({
      skip: process.env.NODE_ENV === 'development',
      entry: 'index.html',
      output: '/build/index.html',
      data: {
        css: '<link type="text/css" rel="stylesheet" href="styles.css">',
        js: '<script src="bundle.js"></script>'
      }
    })
  ]
  ...
};  
module.exports = config;
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!-- replace:css -->
  <link type="text/css" rel="stylesheet" href="style1.css">
  <link type="text/css" rel="stylesheet" href="style2.css">
  <link type="text/css" rel="stylesheet" href="style2.css">
  <!-- endreplace -->
  <title>replace-webpack-plugin</title>
</head>
<body>
  <!-- replace:js -->
  <script src="script1.js"></script>
  <script src="script2.js"></script>
  <script src="script3.js"></script>
  <!-- endreplace -->
</body>
</html>
```	
#### when compilation done:
```html
<!-- build/index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link type="text/css" rel="stylesheet" href="styles.css">
  <title>replace-webpack-plugin</title>
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```	
