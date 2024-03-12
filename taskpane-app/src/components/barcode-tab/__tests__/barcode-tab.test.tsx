import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LoggingUtils } from 'easy-addins-utils';
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
    // no links on the page
    expect(canvas).not.toBeEmptyDOMElement();
    expect((canvas.firstChild as any).tagName).toBe('CANVAS');
  });
})