import { ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Text } from 'ink';
import { Table as InkTable } from '@alcalzone/ink-table';
import { PrimitiveObject } from '../../types.js';

/**
 * The `Table` component props
 *
 * - Generic type `T` for the item
 */
interface Props<T extends PrimitiveObject<T>> {
  readonly items: T[];
}

/**
 * Used to render a
 * table of items
 *
 * - Generic type `T` for the item
 *
 * @param props The component props
 * @returns The `Table` component
 */
const Table = <T extends PrimitiveObject<T>>({ items }: Props<T>): ReactElement<Props<T>> => {
  const data = items.map((item) => {
    return Object
      .keys(item)
      .reduce((map, key) => {
        const value = item[key];

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

        return {
          ...map,
          [formattedKey]: value,
        };
      }, {});
  });

  return (
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
  );
};

export default Table;
