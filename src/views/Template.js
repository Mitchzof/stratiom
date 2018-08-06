import React from 'react';

/*
  Only loaded by server, but contains all basic page elements.
  Add stylesheets/scripts here.
*/

const Template = function (body, state) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Stratiom</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
      <link type="text/css" rel="stylesheet" href="/css/materialize.css"  media="screen,projection"/>
      <script>
        window.REDUX_DATA = ${JSON.stringify(state)}
      </script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
      <div id="app">${body}</div>
      <script src="/client.js"></script>
      <script type="text/javascript" src="/js/scripts.min.js"></script>
    </body>
  </html>
`;
}

export default Template;
