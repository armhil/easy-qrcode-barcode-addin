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
        <li>
          <a href="https://developer.microsoft.com/en-us/fluentui"
          target="_blank" rel="noreferrer">Microsoft's Fluent UI</a></li>
        <li>
          <a href="https://github.com/zpao/qrcode.react"
          target="_blank" rel="noreferrer">Zpao's React QR Code Generator</a></li>
        <li>
          <a href="https://github.com/kciter/react-barcode"
          target="_blank" rel="noreferrer">Kciter's React Barcode Generator</a></li>
      </ul>
    </React.Fragment>
  )
}
