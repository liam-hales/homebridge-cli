import { FunctionComponent, ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';
import { Meter } from '../index.js';

/**
 * The `MeterList` component props
 */
interface Props {
  readonly data: Record<string, number>;
  readonly min: number;
  readonly max: number;
  readonly title?: string;
  readonly unit?: string;
}

/**
 * Used to render a titled
 * list of meter items
 *
 * - Generic type `T` for the data
 *
 * @param props The component props
 * @returns The `MeterList` component
 */
const MeterList: FunctionComponent<Props> = ({ data, min, max, title, unit }): ReactElement<Props> => {
  // Map the data entries into an array
  // of list items to render
  const items = Object
    .entries(data)
    .map((entry) => {
      const [key, value] = entry;

      // Derive the name from the key and make sure it has no case
      // so it is not rendered in its original camel-case format
      const name = key
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase();

      return {
        name: name,
        value: value,
        label: (unit != null) ? `${value} ${unit}` : `${value}`,
      };
    });

  // Calculate the name and label column widths
  // using the value with the longest length
  const [nameWidth, labelWidth] = items.reduce((map, item) => {
    const [nameMax, labelMax] = map;
    const { name, label } = item;

    return [
      Math.max(nameMax, name.length),
      Math.max(labelMax, label.length),
    ];
  }, [0, 0]);

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
            const { name, value, label } = item;
            return (
              <Box
                key={
                  (title != null)
                    ? `meter-list-${title}-item-${index}`
                    : `meter-list-item-${index}`
                }
                flexDirection="row"
                columnGap={2}
              >
                <Box
                  width={nameWidth}
                  flexDirection="column"
                >
                  <Text color={colours.lightGrey}>
                    {name}
                  </Text>
                </Box>
                <Meter
                  min={min}
                  max={max}
                  value={value}
                />
                <Box width={labelWidth}>
                  <Text color={colours.purple}>
                    {label}
                  </Text>
                </Box>
              </Box>
            );
          })
        }
      </Box>
    </Box>
  );
};

export default MeterList;
