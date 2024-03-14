import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import { BarcodeTab } from '../barcode-tab';

describe('barcode rendering', () => {
  it('should match with snapshot', () => {
    const tree = renderer.create(
      <BarcodeTab />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should log a trace', () => {
    const traceMockFn = jest.fn();
    LoggingUtils.Trace = traceMockFn;

    render(<BarcodeTab />);
    expect(traceMockFn).toHaveBeenCalledTimes(1);
    expect(traceMockFn).toHaveBeenCalledWith('qrbar-barcode');
  })

  it('should render links with correct attributes', () => {
    const dom = render(<BarcodeTab />);

    const links = dom.queryAllByRole('link');
    // no links on the page
    expect(links.length).toBe(0);
  });

  it('should render the canvas correctly', () => {
    const dom = render(<BarcodeTab />);

    const canvas = dom.getByTestId('canvas');
    expect(canvas).not.toBeEmptyDOMElement();
    expect((canvas.firstChild as any).tagName).toBe('CANVAS');
  });

  it('should attempt to read from document if textbox is empty', () => {
    AddinUtils.InsertImage = jest.fn();
    AddinUtils.GetText = jest.fn();
    const dom = render(<BarcodeTab />);

    const insertButton = dom.queryByRole('button');
    insertButton!.click();
    expect(AddinUtils.GetText).toHaveBeenCalledTimes(1);
    // as far as we go without further mocking the GetText callbacking
    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(0);
  });

  it('should attempt to insert image if textbox is not empty', () => {
    AddinUtils.InsertImage = jest.fn();
    AddinUtils.GetText = jest.fn();
    const dom = render(<BarcodeTab />);

    const input = dom.queryAllByRole('textbox');
    fireEvent.change(input[0] as HTMLElement, {target: {value: 'testing'}});
    const insertButton = dom.queryByRole('button');
    insertButton!.click();
    expect(AddinUtils.GetText).toHaveBeenCalledTimes(0);
    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
  });
})