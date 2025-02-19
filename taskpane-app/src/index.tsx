import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { EnvironmentUtils } from 'easy-addins-utils';
import App from './app';
import './index.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
const renderApp = () => {
  root.render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  );
};

if (EnvironmentUtils.IsGsuite()) {
  renderApp();
}
else {
  // this is just an extra layer of protection - Office.ready works
  // on localhost, but we don't want to mess-up Google Apps.
  window.Office.onReady(() => {
    renderApp();
  });
}