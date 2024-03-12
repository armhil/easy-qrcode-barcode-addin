import React, { useState, useRef } from 'react';
import { Slider } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import Barcode from 'react-barcode';
import { InputWrapper } from '../input';
import { useStyles } from './styles';

// Barcode component
export function BarcodeTab() {
  React.useEffect(() => {
      LoggingUtils.Trace('qrbar-barcode'); 
  }, []);

  const ref = useRef(null);
  const [text, setText] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(100);
  const styles = useStyles();

  const updateText = (input: string | undefined) => {
    if (input)
      setText(input);
  };

  const insertImageFromCanvas = () => {
    const canvasValue = getCanvasURL();
    AddinUtils.InsertImage(canvasValue, () => {});
  }

  // Insert image to Word
  const insertImage = () => {
    if (!text) {
        AddinUtils.GetText((t: string) => {
          setText(t);
          insertImageFromCanvas();
        });
    }
    else if (text && text.length) {
      insertImageFromCanvas();
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
    <>
      <div data-testid='input-barcode-text'>
        <InputWrapper updateText={updateText} value={text} label="Barcode text"/>
      </div>
      <Slider className={styles.slider} label="Width" onChange={setWidth} min={0.5} max={5} step={0.5} defaultValue={width} showValue snapToStep />
      <Slider className={styles.slider} label="Height" onChange={setHeight} min={50} max={150} step={5} defaultValue={height} showValue snapToStep />
      <div ref={ref} data-testid='canvas'>
        <Barcode displayValue={false} renderer='canvas'
          width={width} height={height} value={text}/>
      </div>
      <div>
          <Button data-testid='btn-insert-image' appearance='primary' onClick={insertImage}>Insert Image</Button>
      </div>
    </>
  );
}
