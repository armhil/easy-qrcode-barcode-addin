import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { AddinUtils } from 'easy-addins-utils';
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

AddinUtils.Initialize(() => {
  renderApp();
});
