import { FunctionComponent, ReactElement, useState } from 'react';
import TextInput from 'ink-text-input';
import { useApp } from '../../hooks/index.js';
import { Box, Text, useInput } from 'ink';
import { colours } from '../../constants.js';

/**
 * The component rendered when
 * the `/login` command is executed
 *
 * @returns The `Login` component
 */
const Login: FunctionComponent = (): ReactElement => {
  const { setCredentials } = useApp();

  const [stage, setStage] = useState<'set-username' | 'set-password'>('set-username');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * Used to handle when the
   * enter/return key is pressed
   */
  const onEnter = async (): Promise<void> => {
    if (stage === 'set-username' && username !== '') {
      setStage('set-password');
    }

    if (stage === 'set-password' && password !== '') {
      await setCredentials(username, password);
    }
  };

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    if (key.return === true) {
      void onEnter();
    }
  });

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        <Text color={colours.lightGrey}>
          └─ Enter Homebridge login credentials
        </Text>
      </Box>
      <Box
        flexDirection="row"
        columnGap={1}
      >
        <Text
          color={colours.white}
          backgroundColor={colours.purple}
          underline={true}
        >
          {` Username: `}
        </Text>
        <TextInput
          value={username}
          onChange={setUsername}
          focus={stage === 'set-username'}
        />
      </Box>
      {
        (stage === 'set-password') && (
          <Box
            flexDirection="row"
            columnGap={1}
          >
            <Text
              color={colours.white}
              backgroundColor={colours.purple}
              underline={true}
            >
              {` Password: `}
            </Text>
            <TextInput
              value={password}
              onChange={setPassword}
              mask="*"
            />
          </Box>
        )
      }
    </Box>
  );
};

export default Login;
