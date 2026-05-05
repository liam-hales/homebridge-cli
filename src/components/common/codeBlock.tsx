import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { highlight, Theme } from 'cli-highlight';
import { colours } from '../../constants.js';
import chalk from 'chalk';

/**
 * The `CodeBlock` component props
 */
interface Props {
  readonly language: 'json';
  readonly children: string;
}

/**
 * Used to render a syntax highlighted block
 * of code using `cli-highlight` under the hood
 *
 * @param props The component props
 * @returns The `CodeBlock` component
 */
const CodeBlock: FunctionComponent<Props> = ({ language, children }): ReactElement<Props> => {
  const theme: Theme = {
    default: chalk.hex(colours.lightGrey),
    attr: chalk.hex(colours.pink),
    string: chalk.hex(colours.green),
    number: chalk.hex(colours.coral),
    literal: chalk.hex(colours.peach),
  };

  // Highlight the children code string using
  // the provided language and theme
  const highlighted = highlight(children, {
    language: language,
    theme: theme,
    ignoreIllegals: true,
  });

  // Split the highlighted code into lines and calculate the
  // line padding using the length of the last line number
  const lines = highlighted.split('\n');
  const linePadding = `${lines.length}`.length;

  return (
    <>
      {
        lines.map((line, index) => {
          const lineNumber = `${index + 1}`;
          return (
            <Box
              flexDirection="row"
              key={`code-block-line-${lineNumber}`}
              columnGap={3}
            >
              <Text color={colours.darkGrey}>
                {`${lineNumber.padStart(linePadding)} |`}
              </Text>
              <Text>
                {line}
              </Text>
            </Box>
          );
        })
      }
    </>
  );
};

export default CodeBlock;
