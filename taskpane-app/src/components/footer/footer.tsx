import React from 'react';
import { Link } from '@fluentui/react-components';
import { LoggingUtils } from 'easy-addins-utils';
import { useStyles } from './styles';
export function GithubFooter() {
  const styles = useStyles();
  const onClick = () => {
    LoggingUtils.Trace('qrbar-github');
    window.open("https://github.com/armhil/easy-qrcode-barcode-addin");
  }

  return (
    <div className={styles.footer}>
      <div className={styles.footerIcon}>
        <img alt="github icon" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="32px" height="32px"/>
      </div>
      <span className={styles.footerNotification}>Easy QR Code Barcode is open source now! </span>
      <Link as="button" onClick={onClick}>Contribute here</Link>
    </div>
  );
}