import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import { BarcodeTab } from '../barcode-tab';

describe('barcode rendering', () => {
  let rafSpy: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach(() => {
    jest.clearAllMocks();
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
  });

  afterEach(() => {
    rafSpy?.mockRestore();
  });

  it('should match with snapshot', () => {
    const tree = renderer.create(<BarcodeTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should log a trace', () => {
    const traceMockFn = jest.fn();
    LoggingUtils.Trace = traceMockFn;

    render(<BarcodeTab />);
    expect(traceMockFn).toHaveBeenCalledTimes(1);
    expect(traceMockFn).toHaveBeenCalledWith('qrbar-barcode');
  });

  it('should render links with correct attributes', () => {
    const dom = render(<BarcodeTab />);

    const links = dom.queryAllByRole('link');
    // no links on the page
    expect(links.length).toBe(0);
  });

  it('should not render the canvas on empty text', () => {
    const dom = render(<BarcodeTab />);

    const canvas = dom.queryByTestId('barcode-canvas');
    expect(canvas).toBeNull();
  });

  it('should render the canvas correctly on non-empty text', () => {
    const dom = render(<BarcodeTab />);
    // enter value testing
    const input = dom.queryAllByRole('textbox');
    act(() => {
      fireEvent.change(input[0] as HTMLElement, {
        target: { value: 'testing' },
      });
    });
    const canvas = dom.getByTestId('barcode-canvas');
    expect(canvas).not.toBeEmptyDOMElement();
    expect((canvas.firstChild as HTMLElement).tagName).toBe('CANVAS');
  });

  it('should attempt to read from document if textbox is empty', async () => {
    AddinUtils.InsertImage = jest.fn().mockResolvedValue(undefined);
    AddinUtils.GetText = jest.fn().mockResolvedValue('from-doc');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Office = {
      context: {
        document: {
          getSelectedDataAsync: jest.fn(),
        },
      },
    };
    const dom = render(<BarcodeTab />);

    const insertButton = dom.queryByRole('button');
    await act(async () => {
      insertButton!.click();
    });
    expect(AddinUtils.GetText).toHaveBeenCalledTimes(1);
    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
  });

  it('should attempt to insert image if textbox is not empty', async () => {
    AddinUtils.InsertImage = jest.fn().mockResolvedValue(undefined);
    AddinUtils.GetText = jest.fn();
    const dom = render(<BarcodeTab />);

    const input = dom.queryAllByRole('textbox');
    await act(async () => {
      fireEvent.change(input[0] as HTMLElement, {
        target: { value: 'testing' },
      });
    });
    const insertButton = dom.queryByRole('button');
    await act(async () => {
      insertButton!.click();
    });
    expect(AddinUtils.GetText).toHaveBeenCalledTimes(0);
    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
  });

  it('should handle promise rejection when inserting image', async () => {
    AddinUtils.InsertImage = jest.fn().mockRejectedValue(new Error('fail'));
    AddinUtils.GetText = jest.fn();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const dom = render(<BarcodeTab />);

    await act(async () => {
      const input = dom.queryAllByRole('textbox');
      fireEvent.change(input[0] as HTMLElement, {
        target: { value: 'testing' },
      });
      const insertButton = dom.queryByRole('button');
      insertButton!.click();
    });

    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      'something went wrong on insert image from canvas.',
      new Error('fail')
    );
    errorSpy.mockRestore();
  });

  it('should handle promise rejection when reading from document', async () => {
    AddinUtils.InsertImage = jest.fn();
    AddinUtils.GetText = jest.fn().mockRejectedValue(new Error('fail'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const dom = render(<BarcodeTab />);

    await act(async () => {
      const insertButton = dom.queryByRole('button');
      insertButton!.click();
    });

    expect(AddinUtils.GetText).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      'something went wrong on insert image.',
      new Error('fail')
    );
    errorSpy.mockRestore();
  });
});
