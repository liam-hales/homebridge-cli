import { FunctionComponent, ReactElement } from 'react';
import { Text } from 'ink';
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

  return (
    <Text>
      {highlighted}
    </Text>
  );
};

export default CodeBlock;
