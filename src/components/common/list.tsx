import { FunctionComponent, ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';
import { ListItem } from '../types.js';

/**
 * The `List` component props
 */
interface Props {
  readonly title: string;
  readonly items: ListItem[];
}

/**
 * Used to render a titled
 * list of items
 *
 * @param props The component props
 * @returns The `List` component
 */
const List: FunctionComponent<Props> = ({ title, items }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      <Text
        bold={true}
        underline={true}
      >
        {title}
      </Text>
      <Box
        flexDirection="row"
        marginLeft={1}
      >
        <Box
          flexDirection="column"
          width={25}
        >
          {
            items.map((item, index) => {
              const { name } = item;
              return (
                <Text key={`list-${title}-name-${index}`}>
                  └─
                  {' '}
                  {name}
                </Text>
              );
            })
          }
        </Box>
        <Box flexDirection="column">
          {
            items.map((item, index) => {
              const { value } = item;
              return (
                <Text
                  key={`list-${title}-value-${index}`}
                  color={colours.purple}
                >
                  {value}
                </Text>
              );
            })
          }
        </Box>
      </Box>
    </Box>
  );
};

export default List;
