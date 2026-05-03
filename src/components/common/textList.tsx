import { ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';
import { TextListData, ValueFormatters } from '../types.js';
import { isDate } from '../../date.js';

/**
 * The `TextList` component props
 *
 * - Generic type `T` for the data
 */
interface Props<T extends TextListData> {
  readonly data: T;
  readonly title?: string;
  readonly keyWidth?: number;
  readonly format?: ValueFormatters<T>;
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
const TextList = <T extends TextListData>({ data, title, keyWidth = 20, format = {} }: Props<T>): ReactElement<Props<T>> => {
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

      // If the value is a date then convert it
      // into a more readable format in local time
      if (isDate(value) === true) {
        return {
          name: name,
          value: value
            .local()
            .format('DD MMM YYYY, HH:mm'),
        };
      }

      // Check if there is a value formatter for
      // the key and if so use it to transform the value
      const formatter = format[key];
      return {
        name: name,
        value: (formatter != null) ? formatter(value) : value.toString(),
      };
    });

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      {
        (title != null) && (
          <Text
            color={colours.white}
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
                    ? `text-list-${title}-item-${index}`
                    : `text-list-item-${index}`
                }
                flexDirection="row"
              >
                <Box
                  width={keyWidth}
                  flexDirection="column"
                >
                  <Text color={colours.lightGrey}>
                    {`└─ ${name}`}
                  </Text>
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
