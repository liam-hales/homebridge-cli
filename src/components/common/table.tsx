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
  readonly padding?: number;
  readonly format?: ValueFormatters<T>;
  readonly showRowColumn?: boolean;
  readonly isSelectable?: boolean;
  readonly onSelect?: (item: T) => void;
}

/**
 * Used to render a paginated table of
 * items with optional row selection
 *
 * - Generic type `T` for the item
 *
 * @param props The component props
 * @returns The `Table` component
 */
const Table = <T extends TableItem>(props: Props<T>): ReactElement<Props<T>> => {
  const {
    items,
    pageSize = 10,
    padding = 4,
    format,
    showRowColumn = true,
    isSelectable = false,
    onSelect,
  } = props;

  const [position, setPosition] = useState<number>(0);

  /**
   * Used to calculate the cursor index, page and
   * total page count when the position changes
   */
  const [cursorIndex, page, totalPages] = useMemo(() => {
    // Define the page and cursor index using
    // the current position and page size
    const page = Math.floor(position / pageSize) + 1;
    const cursorIndex = position % pageSize;

    // Calculate the total number of pages
    // using the items length and page size
    const totalPages = Math.ceil(items.length / pageSize);

    return [
      cursorIndex,
      page,
      totalPages,
    ];
  }, [position]);

  /**
   * Used to calculate the headers, rows
   * and column widths for the table
   */
  const [headers, rows, widths] = useMemo(() => {
    // Make sure the headers have no case so they are
    // not rendered in its original camel-case format
    const headers = [
      ...(showRowColumn === true) ? ['#'] : [],
      ...Object
        .keys(items.at(0) ?? [])
        .map((key) => {
          return key
            .replace(/([A-Z])/g, ' $1')
            .toLowerCase();
        }),
    ];

    // Slice and map the items into rows
    // of formatted cell data to render
    const rows = items
      .slice((page - 1) * pageSize, page * pageSize)
      .map((item, rowIndex) => {
        const cells = Object
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
            const formatter = format?.[key];
            return (formatter != null) ? formatter(value) : value.toString();
          });

        const rowNumber = ((page - 1) * pageSize) + (rowIndex + 1);
        return [
          ...(showRowColumn === true) ? [rowNumber.toString()] : [],
          ...cells,
        ];
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
  }, [page]);

  // Calculate the Build the separator line which spans all columns
  // with a `+` at each column intersection and edge
  const separator = `+${widths.map((width) => '-'.repeat(width + padding)).join('+')}+`;

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // Only run the logic for selecting
    // rows if the table is selectable
    if (isSelectable === true) {
      if (key.return === true && items.length > 0) {
        const item = items[position];

        // Call `onSelect` with the
        // currently focussed item
        onSelect?.(item);
      }

      if (key.upArrow === true) {
        const nextPosition = position - 1;

        // If the user has reached the first row
        // then send them to the last
        setPosition((nextPosition >= 0)
          ? nextPosition
          : items.length - 1,
        );
      }

      if (key.downArrow === true) {
        const nextPosition = position + 1;

        // If the user has reached the last row
        // then send them to the first
        setPosition((nextPosition < items.length)
          ? nextPosition
          : 0,
        );
      }
    }

    if (key.leftArrow === true) {
      const nextPage = page - 1;
      const targetPage = (nextPage >= 1) ? nextPage : totalPages;

      // Send the user to the target page
      // by setting the correct position
      setPosition((targetPage - 1) * pageSize);
    }

    if (key.rightArrow === true) {
      const nextPage = page + 1;
      const targetPage = (nextPage <= totalPages) ? nextPage : 1;

      // Send the user to the target page
      // by setting the correct position
      setPosition((targetPage - 1) * pageSize);
    }
  });

  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      rowGap={1}
    >
      <Box
        flexDirection="column"
        marginLeft={(isSelectable === true) ? 2 : 0}
      >
        <Text color={colours.darkGrey}>
          {separator}
        </Text>
        <Box flexDirection="row">
          <Text color={colours.darkGrey}>
            |
          </Text>
          {
            headers.map((header, index) => {
              // Generate the header text by padding out the
              // value using the padding and column width
              const headerText = header
                .padStart(header.length + (padding / 2))
                .padEnd(widths[index] + padding);

              return (
                <Box
                  key={`table-header-cell-${header}`}
                  flexDirection="row"
                >
                  <Text
                    color={colours.purple}
                    bold={true}
                  >
                    {headerText}
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
          rows.map((row, rowIndex) => {
            const isFocussed = (isSelectable === true && rowIndex === cursorIndex);
            return (
              <Box
                key={`table-row-${rowIndex}`}
                flexDirection="row"
              >
                {
                  (isSelectable === true) && (
                    <Box
                      width={2}
                      flexDirection="column"
                    >
                      {
                        (rowIndex === cursorIndex) && (
                          <Text
                            color={colours.purple}
                            bold={true}
                          >
                            ⟶
                          </Text>
                        )
                      }
                    </Box>
                  )
                }
                {
                  (isFocussed === true)
                    ? (
                        <Text
                          color={colours.white}
                          backgroundColor={colours.purple}
                        >
                          |
                        </Text>
                      )
                    : (
                        <Text color={colours.darkGrey}>
                          |
                        </Text>
                      )
                }
                {
                  row.map((cell, cellIndex) => {
                    // Generate the cell text by padding out the
                    // value using the padding and column width
                    const cellText = cell
                      .padStart(cell.length + (padding / 2))
                      .padEnd(widths[cellIndex] + padding);

                    return (
                      <Box
                        key={`table-row-cell-${cell}`}
                        flexDirection="row"
                      >
                        {
                          (isFocussed === true)
                            ? (
                                <>
                                  <Text
                                    color={colours.white}
                                    backgroundColor={colours.purple}
                                  >
                                    {`${cellText}|`}
                                  </Text>
                                </>
                              )
                            : (
                                <>
                                  <Text color={colours.lightGrey}>
                                    {cellText}
                                  </Text>
                                  <Text color={colours.darkGrey}>
                                    |
                                  </Text>
                                </>
                              )
                        }
                      </Box>
                    );
                  })
                }
              </Box>
            );
          })
        }
      </Box>
      <Box
        width={separator.length}
        flexDirection="row"
        justifyContent="space-between"
        marginLeft={(isSelectable === true) ? 2 : 0}
        paddingX={1}
      >
        <Keybindings bindings={[
          ...(isSelectable === true)
            ? [{
                key: '↑/↓',
                action: 'to select',
              }]
            : [],
          ...(totalPages > 1)
            ? [{
                key: '←/→',
                action: 'to page',
              }]
            : [],
        ]}
        />
        {
          (totalPages > 1) && (
            <Pagination
              page={page}
              totalPages={totalPages}
            />
          )
        }
      </Box>
    </Box>
  );
};

export default Table;
