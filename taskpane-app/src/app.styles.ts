import { makeStyles, shorthands } from '@fluentui/react-components';

export const useAppStyles = makeStyles({
	paddedContent: {
    ...shorthands.padding('7px')
  },
  tabContent: {
    paddingTop: '15px'
  }
});