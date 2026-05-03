import { ReactElement, useEffect, useRef, useState } from 'react';
import { colours } from '../../constants.js';
import { Box, DOMElement, measureElement, Text, useInput } from 'ink';
import { Keybindings, Pagination } from '../index.js';
import { Table as InkTable } from '@alcalzone/ink-table';
import { TableItem, ValueFormatters } from '../types.js';
import { isDate } from '../../date.js';

/**
 * The `Table` component props
 *
 * - Generic type `T` for the item
 */
interface Props<T extends TableItem> {
  readonly items: T[];
  readonly pageSize?: number;
  readonly format?: ValueFormatters<T>;
}

/**
 * Used to render a paginated
 * table of items
 *
 * - Generic type `T` for the item
 *
 * @param props The component props
 * @returns The `Table` component
 */
const Table = <T extends TableItem>({ items, pageSize = 10, format = {} }: Props<T>): ReactElement<Props<T>> => {
  const ref = useRef<DOMElement>(null);

  const [page, setPage] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  /**
   * Used to measure the `InkTable` component and
   * set the width state when the component mounts
   */
  useEffect(() => {
    if (ref.current != null) {
      // Measure the element using its reference
      // and set the width state
      const { width } = measureElement(ref.current);
      setWidth(width);
    }
  }, []);

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // If the right arrow key was pressed then increment
    // the page number to go to the next page
    if (key.rightArrow === true) {
      setPage((previous) => Math.min(totalPages - 1, previous + 1));
    }

    // If the left arrow key was pressed then decrement
    // the page number to go to the previous page
    if (key.leftArrow === true) {
      setPage((previous) => Math.max(0, previous - 1));
    }
  });

  // Calculate the total number of pages using the items length and page size
  // Slice and map the items into data to render in the table for the current page
  const totalPages = Math.ceil(items.length / pageSize);
  const data = items
    .slice(page * pageSize, (page + 1) * pageSize)
    .map((item) => {
      return Object
        .entries(item)
        .reduce((map, entry) => {
          const [key, value] = entry;

          // Make sure the key has no case so it is not
          // rendered in its original camel-case format
          const formattedKey = key
            .toString()
            .replace(/([A-Z])/g, ' $1')
            .toLowerCase();

          // If the value is a boolean then
          // convert it to `yes` or `no`
          if (typeof value === 'boolean') {
            return {
              ...map,
              [formattedKey]: (value === true) ? '✔ yes' : '× no',
            };
          }

          // If the value is a date then convert it
          // into a more readable format in local time
          if (isDate(value) === true) {
            return {
              ...map,
              [formattedKey]: value
                .local()
                .format('DD MMM YYYY, HH:mm'),
            };
          }

          // Check if there is a value formatter for
          // the key and if so use it to transform the value
          const formatter = format[key];
          return {
            ...map,
            [formattedKey]: (formatter != null) ? formatter(value) : value,
          };
        }, {});
    });

  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      flexGrow={1}
      rowGap={1}
    >
      <Box
        ref={ref}
        flexDirection="column"
      >
        <InkTable
          data={data}
          padding={1}
          header={({ children }) => {
            return (
              <Text
                bold={true}
                color={colours.purple}
              >
                {children}
              </Text>
            );
          }}
          cell={({ children }) => {
            return (
              <Text color={colours.lightGrey}>
                {children}
              </Text>
            );
          }}
          skeleton={({ children }) => {
            return (
              <Text color={colours.darkGrey}>
                {children}
              </Text>
            );
          }}
        />
      </Box>
      {
        (totalPages > 1) && (
          <Box
            width={width}
            flexDirection="row"
            justifyContent="space-between"
            paddingX={1}
          >
            <Keybindings bindings={[
              {
                key: '←/→',
                action: 'to page',
              },
            ]}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
            />
          </Box>
        )
      }
    </Box>
  );
};

export default Table;
