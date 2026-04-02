import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../constants.js';
import TextInput from 'ink-text-input';

/**
 * The `CommandInput` component props
 */
interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Used to render the input for the
 * user to enter a command to run
 *
 * @param props The component props
 * @returns The `CommandInput` component
 */
const CommandInput: FunctionComponent<Props> = ({ value, onChange }): ReactElement<Props> => {
  return (
    <>
      <Box
        width="100%"
        borderStyle="round"
        borderColor={colours.darkGrey}
        paddingX={1}
      >
        <TextInput
          value={value}
          placeholder="/ Enter command"
          onChange={onChange}
        />
      </Box>
      {
        (value !== '') && (
          <Box
            flexDirection="row"
            marginX={1}
            marginY={1}
          >
            <Box
              flexDirection="column"
              width={20}
            >
              <Text>{'/init <host>'}</Text>
              <Text>/login</Text>
            </Box>
            <Box
              flexDirection="column"
              flexGrow={1}
            >
              <Text>Used to connect to a Homebridge server</Text>
              <Text>Used to login to Homebridge</Text>
            </Box>
          </Box>
        )
      }
    </>
  );
};

export default CommandInput;
