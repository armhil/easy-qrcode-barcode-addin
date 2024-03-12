import React, { useState, useRef } from 'react';
import { Button } from '@fluentui/react-components';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import QRCode from 'qrcode.react';
import './../styles/qrcode.css';
import { InputWrapper } from './input';
import { Slider } from '@fluentui/react';
// Qr code route
export function QrCodeRoute() {
  React.useEffect(() => {
    LoggingUtils.Trace('qrbar-qrcode'); 
  }, []);    
  
  const ref = useRef(null);
  const [text, setText] = useState("");
  const [size, setSize] = useState(125);

  const updateText = (input: string | undefined) => {
    if (input)
      setText(input);
  };

  // Insert image to Word
  const insertImage = () => {
      if (!text) {
          AddinUtils.GetText((t: string) => {
              setText(t);
              let canvasUrl = getCanvasURL();
              AddinUtils.InsertImage(canvasUrl, () => {});
          });
      }
      else if (text && text.length) {
          let canvasUrl = getCanvasURL();
          AddinUtils.InsertImage(canvasUrl, () => {});
      }
      else {
          //AddinUtils.("Could get the data URL from the canvas");
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
    <React.Fragment>
      <InputWrapper updateText={updateText} value={text} label='QR Code text'/>
      <Slider className="padded-top padded-bottom" label="Size" onChange={(v: any) => setSize(v)} min={50} max={300} step={5} defaultValue={125} showValue snapToStep />
      <div ref={ref}>
        <QRCode size={size} value={text}/>
      </div>
      <div className="padded-top">
        <Button appearance='primary' onClick={insertImage}>Insert Image</Button>
      </div>
    </React.Fragment>
  )
}
