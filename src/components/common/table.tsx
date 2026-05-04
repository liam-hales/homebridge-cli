import { ReactElement, useMemo, useState } from 'react';
import { colours } from '../../constants.js';
import { Box, Text, useInput } from 'ink';
import { TableItem, ValueFormatters } from '../types.js';
import { isDate } from '../../date.js';
import { Keybindings, Pagination } from '../index.js';

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
  const [page, setPage] = useState<number>(1);

  // Define the padding and calculate the total number
  // of pages using the items length and page size
  const padding = 4;
  const totalPages = Math.ceil(items.length / pageSize);

  /**
   * Used to calculate the headers, rows
   * and column widths for the table
   */
  const [headers, rows, widths] = useMemo(() => {
    // Make sure the headers have no case so they are
    // not rendered in its original camel-case format
    const headers = Object
      .keys(items.at(0) ?? [])
      .map((key) => {
        return key
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase();
      });

    // Slice and map the items into rows
    // of formatted cell data to render
    const rows = items
      .slice((page - 1) * pageSize, page * pageSize)
      .map((item) => {
        return Object
          .entries(item)
          .map((entry) => {
            const [key, value] = entry;

            // If the value is a boolean then
            // convert it to `yes` or `no`
            if (typeof value === 'boolean') {
              return (value === true) ? '✔ yes' : '× no';
            }

            // If the value is a date then convert it
            // into a more readable format in local time
            if (isDate(value) === true) {
              return value
                .local()
                .format('DD MMM YYYY, HH:mm');
            }

            // Check if there is a value formatter for
            // the key and if so use it to transform the value
            const formatter = format[key];
            return (formatter != null) ? formatter(value) : value.toString();
          });
      });

    // Calculate each column width using the
    // longest header or row cell length
    const widths = headers.map((header, columnIndex) => {
      // Use the header length as the default and reduce
      // the rows into the longest column width
      return rows.reduce((max, row) => {
        const cell = row[columnIndex];

        return Math.max(max, cell.length);
      }, header.length);
    });

    return [
      headers,
      rows,
      widths,
    ];
  }, [items, page]);

  // Calculate the Build the separator line which spans all columns
  // with a `+` at each column intersection and edge
  const separator = `+${widths.map((width) => '-'.repeat(width + padding)).join('+')}+`;

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    if (key.rightArrow === true) {
      const nextPage = page + 1;

      // If the user has reached the last page
      // then send them to the first
      setPage(
        (nextPage <= totalPages)
          ? nextPage
          : 1,
      );
    }

    if (key.leftArrow === true) {
      const nextPage = page - 1;

      // If the user has reached the first page
      // then send them to the last
      setPage(
        (nextPage >= 1)
          ? nextPage
          : totalPages,
      );
    }
  });

  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      rowGap={1}
    >
      <Box flexDirection="column">
        <Text color={colours.darkGrey}>
          {separator}
        </Text>
        <Box flexDirection="row">
          <Text color={colours.darkGrey}>
            |
          </Text>
          {
            headers.map((header, index) => {
              return (
                <Box
                  key={`table-header-cell-${header}`}
                  flexDirection="row"
                >
                  <Text
                    color={colours.purple}
                    bold={true}
                  >
                    {
                      header
                        .padStart(header.length + (padding / 2))
                        .padEnd(widths[index] + padding)
                    }
                  </Text>
                  <Text color={colours.darkGrey}>
                    |
                  </Text>
                </Box>
              );
            })
          }
        </Box>
        <Text color={colours.darkGrey}>
          {separator}
        </Text>
      </Box>
      <Box flexDirection="column">
        {
          rows.map((row, index) => {
            return (
              <Box key={`table-row-${index}`}>
                <Box flexDirection="row">
                  <Text color={colours.darkGrey}>
                    |
                  </Text>
                  {
                    row.map((cell, index) => {
                      return (
                        <Box
                          key={`table-row-cell-${cell}`}
                          flexDirection="row"
                        >
                          <Text color={colours.lightGrey}>
                            {
                              cell
                                .padStart(cell.length + (padding / 2))
                                .padEnd(widths[index] + padding)
                            }
                          </Text>
                          <Text color={colours.darkGrey}>
                            |
                          </Text>
                        </Box>
                      );
                    })
                  }
                </Box>
              </Box>
            );
          })
        }
      </Box>
      {
        (totalPages > 1) && (
          <Box
            width={separator.length}
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
