import React from 'react';
import { Slider } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import Barcode from 'react-barcode';
import { InputWrapper } from '../input';
import { useStyles } from './styles';

type BarcodeTabProps = {
  styles: ReturnType<typeof useStyles>;
};

type BarcodeTabState = {
  text: string;
  width: number;
  height: number;
};

// Barcode component
class BarcodeTabComponent extends React.Component<
  BarcodeTabProps,
  BarcodeTabState
> {
  private ref = React.createRef<HTMLDivElement>();

  state: BarcodeTabState = {
    text: '',
    width: 1,
    height: 100,
  };

  componentDidMount(): void {
    LoggingUtils.Trace('qrbar-barcode');
  }

  private triggerInsertAfterRender = () => {
    // wait for the next frame so the barcode canvas reflects the latest state
    window.requestAnimationFrame(() => this.insertImageFromCanvas());
  };

  insertImageFromCanvas = async () => {
    try {
      const canvasValue = this.getCanvasURL();
      if (canvasValue) await AddinUtils.InsertImage(canvasValue);
    } catch (err) {
      console.error('something went wrong on insert image from canvas.', err);
    }
  };

  // Insert image to Word
  insertImage = async () => {
    try {
      if (!this.state.text || this.state.text.length === 0) {
        const text = await AddinUtils.GetText();
        this.setState({ text }, this.triggerInsertAfterRender);
        return;
      } else {
        this.triggerInsertAfterRender();
      }
    } catch (err) {
      console.error('something went wrong on insert image.', err);
    }
  };

  getCanvasURL = () => {
    const dataValue = this.ref?.current?.['children']?.[0];
    if (dataValue) {
      const sourceCanvas = dataValue as HTMLCanvasElement;
      const canvasWithBorder = document.createElement('canvas');
      canvasWithBorder.width = sourceCanvas.width + 2;
      canvasWithBorder.height = sourceCanvas.height + 2;
      const context = canvasWithBorder.getContext('2d');
      if (!context) return;

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvasWithBorder.width, canvasWithBorder.height);
      context.drawImage(sourceCanvas, 1, 1);

      let str = canvasWithBorder.toDataURL('image/png');
      str = str.split('data:image/png;base64,')[1];
      return str;
    }
  };

  render() {
    const { text, width, height } = this.state;

    return (
      <>
        <div data-testid="input-barcode-text">
          <InputWrapper
            updateText={(val) => this.setState({ text: val })}
            value={text}
            label="Barcode text"
          />
        </div>
        <Slider
          className={this.props.styles.slider}
          label="Width"
          onChange={(val) => this.setState({ width: val })}
          min={0.5}
          max={5}
          step={0.5}
          defaultValue={width}
          showValue
          snapToStep
        />
        <Slider
          className={this.props.styles.slider}
          label="Height"
          onChange={(val) => this.setState({ height: val })}
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
            <div ref={this.ref} data-testid="barcode-canvas">
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
            onClick={this.insertImage}
          >
            Insert Image
          </Button>
        </div>
      </>
    );
  }
}

export function BarcodeTab() {
  const styles = useStyles();
  return <BarcodeTabComponent styles={styles} />;
}
