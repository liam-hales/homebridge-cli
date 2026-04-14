import { FunctionComponent, ReactElement, useEffect, useMemo, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colours } from '../constants.js';
import { commands } from '../commands/index.js';
import { Keybindings } from './index.js';
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
  const [listIndex, setListIndex] = useState<number>(0);

  /**
   * The filtered list of commands based
   * on the current input value
   */
  const filteredCommands = useMemo(() => {
    return commands.filter(({ usage }) => usage.includes(value));
  }, [value]);

  /**
   * Used to reset the list index
   * state when the value changes
   */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setListIndex(0), [value]);

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // If the escape key is pressed then
    // clear the input value
    if (key.escape === true) {
      onChange('');
    }

    if (key.tab === true && listIndex >= 0) {
      const { run } = filteredCommands[listIndex];

      // Call `onChange` with the
      // command run value
      onChange(run);
    }

    if (key.upArrow === true) {
      const nextIndex = listIndex - 1;

      // Set the new list index based on the next one to be set
      // If the user has reached the start of the list then send them to the end
      setListIndex(
        (nextIndex >= 0)
          ? nextIndex
          : filteredCommands.length - 1,
      );
    }

    if (key.downArrow === true) {
      const nextIndex = listIndex + 1;

      // Set the new list index based on the next one to be set
      // If the user has reached the end of the list then send them bac to the start
      setListIndex(
        (nextIndex < filteredCommands.length)
          ? nextIndex
          : 0,
      );
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
          // Set the `key` prop to force the correct cursor
          // position when `onChange` is called manually
          key={value}
          value={value}
          placeholder="/ Enter command"
          onChange={onChange}
        />
      </Box>
      <Box
        flexDirection="column"
        rowGap={2}
        marginX={1}
      >
        {
          (value.startsWith('/') === true) && (
            <>
              <Box flexDirection="row">
                <Box
                  flexDirection="column"
                  width={20}
                >
                  {
                    // Map the commands into text components
                    // used to render the command usage values
                    filteredCommands.map((command, index) => {
                      const { usage } = command;

                      return (
                        <Text
                          key={`command-usage-${usage}`}
                          bold={(index === listIndex)}
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
                    filteredCommands.map((command, index) => {
                      const { description } = command;

                      return (
                        <Text
                          key={`command-description-${description}`}
                          bold={(index === listIndex)}
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
              <Keybindings bindings={[
                {
                  key: '↑/↓',
                  action: 'to navigate',
                },
                {
                  key: 'tab',
                  action: 'to select',
                },
                {
                  key: 'esc',
                  action: 'to clear',
                },
              ]}
              />
            </>
          )
        }
      </Box>
    </Box>
  );
};

export default CommandInput;
