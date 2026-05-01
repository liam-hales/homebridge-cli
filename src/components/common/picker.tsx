import { FunctionComponent, ReactElement, useEffect, useMemo, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colours } from '../../constants.js';
import { PickerItem } from '../types.js';

/**
 * The `Picker` component props
 */
interface Props {
  readonly items: PickerItem[];
  readonly onSelect: (item: PickerItem) => void;
}

/**
 * Used to render a windowed list of items allowing the
 * user to navigate and select using the keyboard
 *
 * @param props The component props
 * @returns The `Picker` component
 */
const Picker: FunctionComponent<Props> = ({ items, onSelect }): ReactElement<Props> => {
  const [listIndex, setListIndex] = useState<number>(0);

  /**
   * Used to calculate the item window which
   * consists of the window items and the index
   */
  const [windowItems, windowIndex] = useMemo(() => {
    const windowSize = 6;
    const windowScrollPoint = 3;

    // Calculate the max and scroll offsets for the item
    // window using the items and list index
    const maxOffset = Math.max(0, items.length - windowSize);
    const scrollOffset = Math.min(
      Math.max(0, listIndex - windowScrollPoint),
      maxOffset,
    );

    // Calculate the item window and the window
    // index which will be used to render the window
    const itemWindow = items.slice(scrollOffset, scrollOffset + windowSize);
    const windowIndex = listIndex - scrollOffset;

    return [
      itemWindow,
      windowIndex,
    ];
  }, [items, listIndex]);

  /**
   * Used to reset the list index
   * state when the items change
   */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setListIndex(0), [items]);

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    if (key.tab === true && items.length > 0) {
      const item = items[listIndex];

      // Call `onSelect` with the
      // currently selected item
      onSelect(item);
    }

    if (key.upArrow === true) {
      const nextIndex = listIndex - 1;

      // Set the new list index based on the next one to be set
      // If the user has reached the start of the list then send them to the end
      setListIndex(
        (nextIndex >= 0)
          ? nextIndex
          : items.length - 1,
      );
    }

    if (key.downArrow === true) {
      const nextIndex = listIndex + 1;

      // Set the new list index based on the next one to be set
      // If the user has reached the end of the list then send them bac to the start
      setListIndex(
        (nextIndex < items.length)
          ? nextIndex
          : 0,
      );
    }
  });

  return (
    <Box
      height={6}
      flexDirection="column"
    >
      {
        windowItems.map((item, index) => {
          const { name, description } = item;
          return (
            <Box
              key={`picker-item-${name}`}
              flexDirection="row"
            >
              <Box
                width={2}
                flexDirection="column"
              >
                {
                  (index === windowIndex) && (
                    <Text
                      color={colours.purple}
                      bold={true}
                    >
                      ⟶
                    </Text>
                  )
                }
              </Box>
              <Box
                width={24}
                flexDirection="column"
              >
                <Text color={
                  (index === windowIndex)
                    ? colours.purple
                    : colours.lightGrey
                }
                >
                  {name}
                </Text>
              </Box>
              {
                (description != null) && (
                  <Text color={
                    (index === windowIndex)
                      ? colours.purple
                      : colours.grey
                  }
                  >
                    {description}
                  </Text>
                )
              }
            </Box>
          );
        })
      }
    </Box>
  );
};

export default Picker;
