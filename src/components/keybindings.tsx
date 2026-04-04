import { FunctionComponent, ReactElement } from 'react';
import { colours } from '../constants.js';
import { Box, Text } from 'ink';

/**
 * The `Keybindings` component props
 */
interface Props {
  readonly bindings: {
    readonly key: string;
    readonly action: string;
  }[];
}

/**
 * Used to render a list of shortcuts
 * the user can perform
 *
 * @param props The component props
 * @returns The `Keybindings` component
 */
const Keybindings: FunctionComponent<Props> = ({ bindings }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="row"
      columnGap={3}
    >
      {
        bindings.map((binding) => {
          const { key, action } = binding;
          return (
            <Box
              key={`keybinding-${key}`}
              flexDirection="row"
            >
              <Text
                color={colours.lightGrey}
                bold={true}
              >
                {key}
              </Text>
              <Text color={colours.grey}>
                {` ${action}`}
              </Text>
            </Box>
          );
        })
      }
    </Box>
  );
};

export default Keybindings;
