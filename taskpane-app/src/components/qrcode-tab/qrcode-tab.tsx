import React from 'react';
import { Button } from '@fluentui/react-components';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import QRCode from 'qrcode.react';
import { InputWrapper } from '../input';
import { Slider } from '@fluentui/react';
import { useStyles } from './styles';

type QrCodeTabProps = {
  styles: ReturnType<typeof useStyles>;
};

type QrCodeTabState = {
  text: string;
  size: number;
};

class QrCodeTabComponent extends React.Component<
  QrCodeTabProps,
  QrCodeTabState
> {
  private ref = React.createRef<HTMLDivElement>();

  state: QrCodeTabState = {
    text: '',
    size: 125,
  };

  componentDidMount(): void {
    LoggingUtils.Trace('qrbar-qrcode');
  }

  private triggerInsertAfterRender = () => {
    // wait for the next frame so the QR code canvas reflects the latest state
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
    const { text, size } = this.state;

    return (
      <>
        <InputWrapper
          updateText={(val) => this.setState({ text: val })}
          value={text}
          label="QR code text"
        />
        <Slider
          className={this.props.styles.slider}
          label="Size"
          onChange={(v: number) => this.setState({ size: v })}
          min={50}
          max={300}
          step={5}
          defaultValue={size}
          showValue
          snapToStep
        />
        <div ref={this.ref} data-testid="qrcode-canvas">
          <QRCode size={size} value={text} />
        </div>
        <div className={this.props.styles.button}>
          <Button appearance="primary" onClick={this.insertImage}>
            Insert Image
          </Button>
        </div>
      </>
    );
  }
}

// Qr code route
export function QrCodeTab() {
  const styles = useStyles();
  return <QrCodeTabComponent styles={styles} />;
}
