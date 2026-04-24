import { FunctionComponent, ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

/**
 * The `Loader` component props
 */
interface Props {
  readonly children: string;
}

/**
 * Used to render a loading spinner
 * followed by some text
 *
 * @param props The component props
 * @returns The `Loader` component
 */
const Loader: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="row"
      columnGap={1}
    >
      <Spinner type="line" />
      <Text color={colours.lightGrey}>
        {children}
      </Text>
    </Box>
  );
};

export default Loader;
