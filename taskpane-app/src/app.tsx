import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { LoggingUtils } from 'easy-addins-utils';
import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from '@fluentui/react-components';
import {
  BarcodeScanner24Regular,
  QrCode24Regular,
  StarEmphasis24Filled,
} from '@fluentui/react-icons';
import { useAppStyles } from './app.styles';
import { BUILD_DATE } from './build-date';
import * as Components from './components';
// Default app.ts
export function App() {
  // initialize the app
  const styles = useAppStyles();
  React.useEffect(() => {
    initializeIcons();
    LoggingUtils.Trace(`qrbar-app-${BUILD_DATE}`);
  }, []);

  const [selectedTab, setSelectedTab] = React.useState<TabValue>('qr');
  const onTabSelect = (e: SelectTabEvent, d: SelectTabData) => {
    setSelectedTab(d.value);
  };

  return (
    <div>
      <TabList
        selectedValue={selectedTab}
        reserveSelectedTabSpace
        onTabSelect={onTabSelect}
      >
        <Tab icon={<QrCode24Regular />} value="qr">
          QR code
        </Tab>
        <Tab icon={<BarcodeScanner24Regular />} value="bar">
          Bar code
        </Tab>
        <Tab icon={<StarEmphasis24Filled />} value="credits">
          Credits
        </Tab>
      </TabList>
      <div className={styles.tabContent}>
        {selectedTab === 'qr' && <Components.QrCodeTab />}
        {selectedTab === 'bar' && <Components.BarcodeTab />}
        {selectedTab === 'credits' && <Components.CreditsTab />}
      </div>
      <Components.GithubFooter />
    </div>
  );
}

export default App;
