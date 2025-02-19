import React, { useState, useRef } from 'react';
import { Button } from '@fluentui/react-components';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import QRCode from 'qrcode.react';
import { InputWrapper } from '../input';
import { Slider } from '@fluentui/react';
import { useStyles } from './styles';
// Qr code route
export function QrCodeTab() {
  React.useEffect(() => {
    LoggingUtils.Trace('qrbar-qrcode'); 
  }, []);    
  
  const ref = useRef(null);
  const [text, setText] = useState("");
  const [size, setSize] = useState(125);
  const styles = useStyles();

  // Insert image to Word
  const insertImage = () => {
    if (!text || text.length === 0) {
      AddinUtils.GetText((t: string) => {
        setText(t);
        let canvasUrl = getCanvasURL();
        AddinUtils.InsertImage(canvasUrl, () => {});
      });
    }
    else {
      let canvasUrl = getCanvasURL();
      AddinUtils.InsertImage(canvasUrl, () => {});
    }
  };
  
  const getCanvasURL = () => {
    const dataValue: any = ref?.current?.['children']?.[0];
    if (dataValue) {
      let str = dataValue.toDataURL();
      str = str.split('data:image/png;base64,')[1];
      return str;
    }
  };

  return (
    <>
      <InputWrapper updateText={setText} value={text} label='QR code text'/>
      <Slider className={styles.slider} label="Size" onChange={(v: any) => setSize(v)} min={50} max={300} step={5} defaultValue={125} showValue snapToStep />
      <div ref={ref} data-testid="qrcode-canvas">
        <QRCode size={size} value={text}/>
      </div>
      <div className={styles.button}>
        <Button appearance='primary' onClick={insertImage}>Insert Image</Button>
      </div>
    </>
  )
}
