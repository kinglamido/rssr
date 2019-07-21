import React from 'react';
import manifest from '../manifest.json'
export default function renderFullPage(html, css, dev) {
    return `
    <!DOCTYPE html>
<html lang='en'>

<head>
	<meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
    <meta name="theme-color" content="#000000" />
  <link rel="manifest" href=${manifest}>
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" rel="stylesheet">
  <title>Phantom Tech</title>
    <style id='jss-styles'>${css}</style>
</head>

<body>
    <div id='root'>${html}</div>
    <script src='main.js' async></script>
    ${dev ? `<script src='/reload/reload.js' async></script>` : ''}
</body>

</html>
    `;
  }
