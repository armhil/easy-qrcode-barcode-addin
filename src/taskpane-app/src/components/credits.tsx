/** credits route - acknowledging the dependencies */
import React from 'react';
import { LoggingUtils } from 'easy-addins-utils';
export function CreditsRoute() {
  // useEffect for tracing the route, should be logged only once.
  React.useEffect(() => {
    LoggingUtils.Trace('qrbar-credits');
  });

  return (
    <React.Fragment>
      <p>This software wouldn't be possible without components below and countless hours of learning and coding.</p>
      <ul>
        <li><a href="https://developer.microsoft.com/en-us/fluentui"
        // eslint-disable-next-line
        target="_blank">Microsoft's Fluent UI</a></li>
        <li><a href="https://github.com/zpao/qrcode.react"
        // eslint-disable-next-line
        target="_blank">Zpao's React QR Code Generator</a></li>
                <li><a href="https://github.com/kciter/react-barcode"
        // eslint-disable-next-line
        target="_blank">Kciter's React Barcode Generator</a></li>
      </ul>
    </React.Fragment>
  )
}
