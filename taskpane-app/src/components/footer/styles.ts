import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
  footer: {
    position: 'absolute',
    width: '-webkit-fill-available',
    bottom: 0,
    ...shorthands.padding('10px'),
    ...shorthands.borderTop('1px', 'solid', 'rgb(204, 204, 204)'),
  },
  footerIcon: {
    float: 'left',
    paddingRight: '8px'
  },
  footerNotification: {
    fontSize: 'small'
  }
});