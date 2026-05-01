import { FunctionComponent, ReactElement, useMemo } from 'react';
import { Box, useInput } from 'ink';
import { colours } from '../constants.js';
import { commands } from '../commands/index.js';
import { Keybindings, Picker } from './index.js';
import { PickerItem } from './types.js';
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
  /**
   * Used to calculate the command picker
   * items based on the current input value
   */
  const commandPickerItems = useMemo<PickerItem[]>(() => {
    return commands
      .filter(({ invoke }) => invoke.includes(value))
      .sort((a, b) => a.invoke.localeCompare(b.invoke))
      .map((command) => {
        return {
          name: command.invoke,
          description: command.description,
        };
      });
  }, [value]);

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
              <Picker
                items={commandPickerItems}
                onSelect={(item) => onChange(item.name)}
                windowSize={8}
              />
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
