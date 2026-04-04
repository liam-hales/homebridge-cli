import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../constants.js';
import dedent from 'dedent';

/**
 * Used to render the app header which
 * displays the title and welcome UI
 *
 * @returns The `Header` component
 */
const Header: FunctionComponent = (): ReactElement => {
  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      rowGap={1}
    >
      <Box
        paddingLeft={1}
        paddingRight={1}
        borderStyle="singleDouble"
        borderColor="#a058d1"
      >
        <Text color={colours.lightGrey}>
          Welcome to the
          <Text
            color="white"
            bold={true}
          >
            {' Homebridge CLI 🚀'}
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
