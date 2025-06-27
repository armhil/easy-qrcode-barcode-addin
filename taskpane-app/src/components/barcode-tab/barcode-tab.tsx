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
  const [text, setText] = useState('');
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(100);
  const styles = useStyles();

  const insertImageFromCanvas = async () => {
    try {
      const canvasValue = getCanvasURL();
      if (canvasValue) await AddinUtils.InsertImage(canvasValue);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('something went wrong on insert image from canvas.', err);
    }
  };

  // Insert image to Word
  const insertImage = async () => {
    try {
      if (!text || text.length === 0) {
        const text = await AddinUtils.GetText();
        setText(text);
      }
      insertImageFromCanvas();
    } catch {
      console.error('something went wrong on insert image.');
    }
  };

  const getCanvasURL = () => {
    const dataValue = ref?.current?.['children']?.[0];
    if (dataValue) {
      let str = (dataValue as HTMLCanvasElement).toDataURL();
      str = str.split('data:image/png;base64,')[1];
      return str;
    }
  };

  return (
    <>
      <div data-testid="input-barcode-text">
        <InputWrapper updateText={setText} value={text} label="Barcode text" />
      </div>
      <Slider
        className={styles.slider}
        label="Width"
        onChange={setWidth}
        min={0.5}
        max={5}
        step={0.5}
        defaultValue={width}
        showValue
        snapToStep
      />
      <Slider
        className={styles.slider}
        label="Height"
        onChange={setHeight}
        min={50}
        max={150}
        step={5}
        defaultValue={height}
        showValue
        snapToStep
      />
      {
        // barcode doesn't deal well with empty text
        text && text.length > 0 && (
          <div ref={ref} data-testid="barcode-canvas">
            <Barcode
              displayValue={false}
              renderer="canvas"
              width={width}
              height={height}
              value={text}
            />
          </div>
        )
      }
      <div>
        <Button
          data-testid="btn-insert-image"
          appearance="primary"
          onClick={insertImage}
        >
          Insert Image
        </Button>
      </div>
    </>
  );
}
