import { FunctionComponent, ReactElement, useState } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import { colours } from '../constants.js';
import { Header, CommandInput, BlockSwitch, Keybindings } from './index.js';
import { AppMode, Block } from '../types.js';
import { nanoid } from 'nanoid';
import { commands } from '../commands/index.js';

/**
 * The root app component used as the
 * main entry point for the app
 *
 * @returns The `App` component
 */
const App: FunctionComponent = (): ReactElement => {
  const { exit } = useApp();

  const [mode, setMode] = useState<AppMode>('idle');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Used to validate and
   * execute a given input
   *
   * @param input The input
   */
  const _executeInput = (input: string): void => {
    const blockId = nanoid(16);

    // Check if the user
    // wants to exit
    if (input === 'exit') {
      exit();
    }

    try {
      // Attempt to find a command that matches
      // the users input via its run value
      const command = commands.find((command) => command.run === input);

      // If no command could be found
      // then throw an error
      if (command == null) {
        throw new Error(`Command "${input}" not found`);
      }

      setMode('running');
      setBlocks((previous) => [
        ...previous,
        {
          type: 'command',
          id: blockId,
          input: input,
          commandId: command.id,
        },
      ]);
    }
    catch (error) {
      if (error instanceof Error) {
        const { message } = error;

        setBlocks((previous) => {
          return [
            ...previous,
            {
              type: 'error',
              id: blockId,
              input: input,
              message: message,
            },
          ];
        });

        return;
      }

      // Re-throw the error if
      // it cannot be handled
      throw error;
    }
    finally {
      // Reset the input value once the
      // block as been added to state
      setInputValue('');
    }
  };

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // If the user pressed the escape key then
    // set the app mode back to `idle`
    if (key.escape === true) {
      setMode('idle');
    }

    if (key.return === true) {
      const trimmed = inputValue.trim();

      // Execute the command only if there
      // is an input to execute
      if (trimmed !== '') {
        _executeInput(trimmed);
      }
    }
  });

  return (
    <Box
      flexDirection="column"
      rowGap={2}
      marginY={1}
    >
      <Header />
      <Box
        flexDirection="column"
        rowGap={1}
        marginX={1}
      >
        <Text color={colours.lightGrey}>
          Run
          <Text
            color={colours.purple}
            bold={true}
          >
            {' /init '}
          </Text>
          to connect to a Homebridge server
        </Text>
        <Text color={colours.lightGrey}>
          Run
          <Text
            color={colours.purple}
            bold={true}
          >
            {' /login '}
          </Text>
          to login to Homebridge
        </Text>
      </Box>
      {
        (blocks.length > 0) && (
          <Box
            flexDirection="column"
            rowGap={2}
            marginX={1}
          >
            {
              blocks.map((block) => {
                const { id, type } = block;

                return (
                  <BlockSwitch
                    key={`${type}-block-${id}`}
                    {...block}
                  />
                );
              })
            }
            {
              (mode === 'running') && (
                <Keybindings bindings={[
                  {
                    key: 'esc',
                    action: 'to cancel',
                  },
                ]}
                />
              )
            }
          </Box>
        )
      }
      {
        (mode === 'idle') && (
          <CommandInput
            value={inputValue}
            onChange={setInputValue}
          />
        )
      }
    </Box>
  );
};

export default App;
