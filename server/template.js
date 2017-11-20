const template = ({
  css = '',
  html = '',
  state = '',
  hash = Date.now().toString(),
} = {}) => (`
  <!doctype html>
  <html>
    <head>
      <title>Front core</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
      <link rel="icon" href="data:;base64,=">
      <style type="text/css" id="server-side-styles">${css}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    </head>
    <body>
      <div id="app">${html}</div>
      <script id="server-side-state">${state}</script>
      <script src="/core.js?v=${hash}"></script>
    </body>
  </html>
`)

export default template
