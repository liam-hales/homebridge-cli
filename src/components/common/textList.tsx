import { ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';
import { PrimitiveObject } from '../../types.js';

/**
 * The `TextList` component props
 *
 * - Generic type `T` for the data
 */
interface Props<T extends PrimitiveObject<T>> {
  readonly data: T;
  readonly title?: string;
  readonly spacing?: number;
  readonly transform?: Partial<{
    readonly [K in keyof T]: (value: T[K]) => string;
  }>;
}

/**
 * Used to render a titled
 * list of text items
 *
 * - Generic type `T` for the data
 *
 * @param props The component props
 * @returns The `TextList` component
 */
const TextList = <T extends PrimitiveObject<T>>({ data, title, spacing = 2, transform = {} }: Props<T>): ReactElement<Props<T>> => {
  // Map the data entries into an array
  // of list items to render
  const items = Object
    .entries(data)
    .map((entry) => {
      const [key, value] = entry;

      // Derive the name from the key and make sure it has no case
      // so it is not rendered in its original camel-case format
      const name = key
        .toString()
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase();

      // If the value is a boolean then
      // convert it to `yes` or `no`
      if (typeof value === 'boolean') {
        return {
          name: name,
          value: (value === true) ? '✔ yes' : '× no',
        };
      }

      // Check if there is a value transformer for
      // the key and if so use it to transform the value
      const transformer = transform[key];
      return {
        name: name,
        value: (transformer != null) ? transformer(value) : value,
      };
    });

  // Calculate the key column width using
  // the value with the longest length
  const keyWidth = items.reduce((max, item) => {
    const { name } = item;
    return Math.max(max, `└─ ${name}`.length);
  }, 0);

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      {
        (title != null) && (
          <Text
            bold={true}
            underline={true}
          >
            {title}
          </Text>
        )
      }
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        {
          items.map((item, index) => {
            const { name, value } = item;
            return (
              <Box
                key={
                  (title != null)
                    ? `list-${title}-item-${index}`
                    : `list-item-${index}`
                }
                flexDirection="row"
              >
                <Box
                  width={keyWidth + spacing}
                  flexDirection="column"
                >
                  <Text>{`└─ ${name}`}</Text>
                </Box>
                <Text color={colours.purple}>
                  {value}
                </Text>
              </Box>
            );
          })
        }
      </Box>
    </Box>
  );
};

export default TextList;
