import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './index.css';

ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <App />
  </FluentProvider>,
  document.getElementById('root'),
);