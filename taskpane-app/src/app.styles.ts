import { makeStyles, shorthands } from '@fluentui/react-components';

export const useAppStyles = makeStyles({
	padded: {
    ...shorthands.padding('7px')
  }
});