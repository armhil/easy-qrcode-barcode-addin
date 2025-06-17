import React from 'react';
import {
  Link,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components';
import { LoggingUtils } from 'easy-addins-utils';
import { useStyles } from './styles';
import { BUILD_DATE } from '../../build-date';
export function GithubFooter() {
  const styles = useStyles();
  const openGithub = () => {
    LoggingUtils.Trace('qrbar-github');
    window.open('https://github.com/armhil/easy-qrcode-barcode-addin');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerIcon}>
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <Link data-testid="build-date-button" as="button">
              <img
                alt="github icon"
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                width="32px"
                height="32px"
              />
            </Link>
          </PopoverTrigger>

          <PopoverSurface>Build date: {BUILD_DATE}</PopoverSurface>
        </Popover>
      </div>
      <span className={styles.footerNotification}>
        Easy QR Code Barcode is open source now!{' '}
      </span>
      <Link
        data-testid="contribute-github-button"
        as="button"
        onClick={openGithub}
      >
        Contribute here
      </Link>
    </div>
  );
}
