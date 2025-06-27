import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import { QrCodeTab } from '../qrcode-tab';

describe('qrcode rendering', () => {
  it('should match with snapshot', () => {
    const tree = renderer.create(<QrCodeTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should log a trace', () => {
    const traceMockFn = jest.fn();
    LoggingUtils.Trace = traceMockFn;

    render(<QrCodeTab />);
    expect(traceMockFn).toHaveBeenCalledTimes(1);
    expect(traceMockFn).toHaveBeenCalledWith('qrbar-qrcode');
  });

  it('should render links with correct attributes', () => {
    const dom = render(<QrCodeTab />);

    const links = dom.queryAllByRole('link');
    // no links on the page
    expect(links.length).toBe(0);
  });

  it('should render the canvas correctly', () => {
    const dom = render(<QrCodeTab />);

    const canvas = dom.getByTestId('qrcode-canvas');
    expect(canvas).not.toBeEmptyDOMElement();
    expect((canvas.firstChild as HTMLElement).tagName).toBe('CANVAS');
  });

  it('should attempt to read from document if textbox is empty', () => {
    AddinUtils.InsertImage = jest.fn();
    AddinUtils.GetText = jest.fn();

    const dom = render(<QrCodeTab />);

    act(() => {
      const insertButton = dom.queryByRole('button');
      insertButton!.click();
      expect(AddinUtils.GetText).toHaveBeenCalledTimes(1);
    });
  });

  it('should attempt to insert image if textbox is not empty', () => {
    AddinUtils.InsertImage = jest.fn();
    AddinUtils.GetText = jest.fn();
    const dom = render(<QrCodeTab />);

    act(() => {
      const input = dom.queryAllByRole('textbox');

      fireEvent.change(input[0] as HTMLElement, { target: { value: 'testing' } });
      const insertButton = dom.queryByRole('button');
      insertButton!.click();
      expect(AddinUtils.GetText).toHaveBeenCalledTimes(0);
      expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
    });
  });
});
