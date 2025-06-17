import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LoggingUtils } from 'easy-addins-utils';
import { CreditsTab } from '../credits-tab';

describe('credits rendering', () => {
  it('should match with snapshot', () => {
    const tree = renderer.create(<CreditsTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should log a trace', () => {
    const traceMockFn = jest.fn();
    LoggingUtils.Trace = traceMockFn;

    render(<CreditsTab />);
    expect(traceMockFn).toHaveBeenCalledTimes(1);
    expect(traceMockFn).toHaveBeenCalledWith('qrbar-credits');
  });

  it('should render links with correct attributes', () => {
    const dom = render(<CreditsTab />);

    const links = dom.queryAllByRole('link');
    expect(links).not.toBeUndefined();
    // this is to ensure we can pop the users from Win32 apps
    links.forEach((t) => {
      expect(t).toHaveAttribute('target', '_blank');
      expect(t).toHaveAttribute('rel', 'noreferrer');
    });
  });
});
