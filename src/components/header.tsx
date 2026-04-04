import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../constants.js';
import dedent from 'dedent';
import packageJson from '../../package.json' with { type: 'json' };

/**
 * Used to render the app header which
 * displays the title and welcome UI
 *
 * @returns The `Header` component
 */
const Header: FunctionComponent = (): ReactElement => {
  const { version } = packageJson;

  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      rowGap={1}
    >
      <Box
        paddingX={1}
        borderStyle="singleDouble"
        borderColor={colours.purple}
      >
        <Text color={colours.lightGrey}>
          🚀  Welcome to the
          <Text
            color="white"
            bold={true}
          >
            {' Homebridge CLI'}
          </Text>
          <Text color={colours.grey}>
            {` - v${version}`}
          </Text>
        </Text>
      </Box>
      <Text color={colours.purple}>
        {
          dedent`
            ██╗  ██╗ ██████╗ ███╗   ███╗███████╗██████╗ ██████╗ ██╗██████╗  ██████╗ ███████╗     ██████╗██╗     ██╗
            ██║  ██║██╔═══██╗████╗ ████║██╔════╝██╔══██╗██╔══██╗██║██╔══██╗██╔════╝ ██╔════╝    ██╔════╝██║     ██║
            ███████║██║   ██║██╔████╔██║█████╗  ██████╔╝██████╔╝██║██║  ██║██║  ███╗█████╗      ██║     ██║     ██║
            ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗██╔══██╗██║██║  ██║██║   ██║██╔══╝      ██║     ██║     ██║
            ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██████╔╝██║  ██║██║██████╔╝╚██████╔╝███████╗    ╚██████╗███████╗██║
            ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ ╚══════╝     ╚═════╝╚══════╝╚═╝
          `
        }
      </Text>
    </Box>
  );
};

export default Header;
