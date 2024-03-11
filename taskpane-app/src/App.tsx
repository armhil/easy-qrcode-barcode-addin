import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CommandBar, Fabric } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import * as Components from './components';
import * as Constants from './const';
import './styles/app.css';
// Default app.js
export function App() {
  // initialize the app
  React.useEffect(() => {
    initializeIcons();
    AddinUtils.Initialize(() => {});
    LoggingUtils.Trace('qrbar-app');
  },[]);

  return (
    <Fabric>
      <CommandBar items={Constants.CommandBarItems.menu} farItems={Constants.CommandBarItems.sideMenu}/>
      <div className="content-padding">
        <Router>
          <Routes>
              <Route path={Constants.Routes.QRCode} element={<Components.QrCodeRoute/>}/>
              <Route path={Constants.Routes.Barcode} element={<Components.BarcodeRoute/>}/>
              <Route path={Constants.Routes.Credits} element={<Components.Credits/>} />
          </Routes>
        </Router>
      </div>
      <Components.GithubFooter/>
    </Fabric>
  );
}

export default App;
