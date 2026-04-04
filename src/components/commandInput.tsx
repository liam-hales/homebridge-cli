import { FunctionComponent, ReactElement, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colours, commands } from '../constants.js';
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
  const [listIndex, setListIndex] = useState(-1);

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // If there is no input then
    // reset the list index
    if (value === '') {
      setListIndex(-1);
    }

    // If the escape key is pressed then
    // clear the input value
    if (key.escape === true) {
      onChange('');
    }

    if (key.tab === true && listIndex >= 0) {
      const { run } = commands[listIndex];

      // Call `onChange` with the
      // command run value
      onChange(run);
    }

    if (key.upArrow === true) {
      const index = listIndex - 1;

      // Only set the command list index if we
      // are within the commands array length
      if (index >= -1) {
        setListIndex(index);
      }
    }

    if (key.downArrow === true) {
      const index = listIndex + 1;

      // Only set the command list index if we
      // are within the commands array length
      if (index < commands.length) {
        setListIndex(index);
      }
    }
  });

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      <Box
        width="100%"
        borderStyle="round"
        borderColor={colours.darkGrey}
        paddingX={1}
      >
        <TextInput
          /*
           * Set the `key` prop to force the correct cursor
           * position when `onChange` is called manually
           */
          key={value}
          value={value}
          placeholder="/ Enter command"
          onChange={onChange}
        />
      </Box>
      {
        (value !== '') && (
          <Box
            flexDirection="column"
            rowGap={1}
            marginX={1}
          >
            <Box
              flexDirection="row"
            >
              <Box
                flexDirection="column"
                width={20}
              >
                {
                  // Map the commands into text components
                  // used to render the command usage values
                  commands.map((command, index) => {
                    const { usage } = command;

                    return (
                      <Text
                        key={`command-usage-${usage}`}
                        color={
                          (index === listIndex)
                            ? colours.purple
                            : colours.white
                        }
                      >
                        {usage}
                      </Text>
                    );
                  })
                }
              </Box>
              <Box
                flexDirection="column"
                flexGrow={1}
              >
                {
                  // Map the commands into text components
                  // used to render the command descriptions
                  commands.map((command, index) => {
                    const { description } = command;

                    return (
                      <Text
                        key={`command-description-${description}`}
                        color={
                          (index === listIndex)
                            ? colours.purple
                            : colours.white
                        }
                      >
                        {description}
                      </Text>
                    );
                  })
                }
              </Box>
            </Box>
            <Text color={colours.grey}>
              <Text color={colours.lightGrey}>
                {`↑/↓ `}
              </Text>
              to navigate -
              <Text color={colours.lightGrey}>
                {` tab `}
              </Text>
              to select -
              <Text color={colours.lightGrey}>
                {` esc `}
              </Text>
              to clear
            </Text>
          </Box>
        )
      }
    </Box>
  );
};

export default CommandInput;
