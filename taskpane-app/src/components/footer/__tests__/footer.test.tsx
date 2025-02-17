import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LoggingUtils } from 'easy-addins-utils';
import { GithubFooter } from '../footer';

describe('footer rendering', () => {
  it('should match with snapshot', () => {
    const tree = renderer.create(
      <GithubFooter />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a link as button', () => {
    const dom = render(
      <GithubFooter />
    );

    const githubLink = dom.queryByTestId('contribute-github-button');
    expect(githubLink).not.toBeUndefined();
  });

  it('clicking link should track and open github on production', () => {
    const dom = render(
      <GithubFooter />
    );

    const mockTrackFn = jest.fn();
    LoggingUtils.Trace = mockTrackFn;
    const mockOpenFn: any = jest.fn();
    (window as any).open = mockOpenFn;

    const githubLink = dom.queryByTestId('contribute-github-button');
    githubLink?.click();
    expect(mockTrackFn).toHaveBeenCalledTimes(1);
    expect(mockTrackFn).toHaveBeenCalledWith('qrbar-github');
    expect(mockOpenFn).toHaveBeenCalledWith('https://github.com/armhil/easy-qrcode-barcode-addin');
  });
})