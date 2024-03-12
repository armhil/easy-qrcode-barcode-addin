import React, { useState, useRef } from 'react';
import { Button, Input, InputOnChangeData } from '@fluentui/react-components';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import Barcode from 'react-barcode';
import { useInputStyles } from './styles';
import { SliderWrapper } from '../slider';

// Barcode component
export function BarcodeTab() {
  React.useEffect(() => {
      LoggingUtils.Trace('qrbar-barcode'); 
  }, []);

  const ref = useRef(null);
  const [text, setText] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(100);
  const inputStyles = useInputStyles();

  const WidthSlider = () => <SliderWrapper label="Width slider" max={5} min={0.4} step={0.2} value={width} setValue={setWidth} />
  const HeightSlider = () => <SliderWrapper label="Height slider" max={150} min={50} step={5} value={height} setValue={setHeight} />
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
      <p>Select text from your document or type below what you want to generate your code with.</p>
      <Input
        className={inputStyles.width}
        value={text}
        placeholder="Type something or select from your document"
        onChange={(e: any, d: InputOnChangeData) => updateText(d.value)}/>
      <HeightSlider />
      <WidthSlider />
      <div ref={ref}>
        <Barcode displayValue={false}
          width={width} height={height} value={text === "" ? "Testing" : text}/>
      </div>
      <div>
          <Button appearance='primary' onClick={insertImage}>Insert Image</Button>
      </div>
    </>
  );
}
