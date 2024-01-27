import React, { useState, useRef } from 'react';
import { PrimaryButton, TextField, Slider } from '@fluentui/react';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import Barcode from 'react-barcode';
import './../styles/barcode.css';
// Barcode component
export function BarcodeRoute() {
  React.useEffect(() => {
      LoggingUtils.Trace('qrbar-barcode'); 
  }, []);

  const ref = useRef(null);
  const [text, setText] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(100);

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
            AddinUtils.InsertImage(canvasUrl, ()=>{});
        });
    }
    else if (text && text.length) {
        let canvasUrl = getCanvasURL();
        AddinUtils.InsertImage(canvasUrl, ()=>{});
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
      <p>Select text from your document or type below what you want to generate your code with.</p>
      <TextField value={text} placeholder="Type something or select from your document" label="Barcode text" onChange={(e: any, v: string | undefined) => updateText(v)}/>
      <Slider className="padded-top" label="Width" onChange={setWidth} min={0.5} max={5} step={0.5} defaultValue={width} showValue snapToStep />
      <Slider className="padded-top" label="Height" onChange={setHeight} min={50} max={150} step={5} defaultValue={height} showValue snapToStep />
      <div ref={ref}>
          <Barcode displayValue={false}
            width={width} height={height} value={text}/>
      </div>
      <div className="padded-top">
          <PrimaryButton onClick={insertImage}>Insert Image</PrimaryButton>
      </div>
    </React.Fragment>
  );
}
