import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { AddinUtils, LoggingUtils } from 'easy-addins-utils';
import { QrCodeTab } from '../qrcode-tab';

describe('qrcode rendering', () => {
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

  it('should attempt to read from document if textbox is empty', async () => {
    AddinUtils.InsertImage = jest.fn().mockResolvedValue(undefined);
    AddinUtils.GetText = jest.fn().mockResolvedValue('mocked text');

    const dom = render(<QrCodeTab />);

    await act(async () => {
      const insertButton = dom.queryByRole('button');
      insertButton!.click();
    });

    expect(AddinUtils.GetText).toHaveBeenCalledTimes(1);
    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
  });

  it('should handle promise rejection when reading from document', async () => {
    AddinUtils.InsertImage = jest.fn();
    AddinUtils.GetText = jest.fn().mockRejectedValue(new Error('fail'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const dom = render(<QrCodeTab />);

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

  it('should attempt to insert image if textbox is not empty', async () => {
    AddinUtils.InsertImage = jest.fn().mockResolvedValue(undefined);
    AddinUtils.GetText = jest.fn();
    const dom = render(<QrCodeTab />);

    await act(async () => {
      const input = dom.queryAllByRole('textbox');
      fireEvent.change(input[0] as HTMLElement, {
        target: { value: 'testing' },
      });
      const insertButton = dom.queryByRole('button');
      insertButton!.click();
    });

    expect(AddinUtils.GetText).toHaveBeenCalledTimes(0);
    expect(AddinUtils.InsertImage).toHaveBeenCalledTimes(1);
  });

  it('should handle promise rejection when inserting image', async () => {
    AddinUtils.InsertImage = jest.fn().mockRejectedValue(new Error('fail'));
    AddinUtils.GetText = jest.fn();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const dom = render(<QrCodeTab />);

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
});
