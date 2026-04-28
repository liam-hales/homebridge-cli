import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import date from '../../date.js';

/**
 * The `Duration` component props
 */
interface Props {
  readonly seconds: number;
}

/**
 * Used to render a duration broken down into
 * days, hours, minutes and seconds
 *
 * @param props The component props
 * @returns The `Duration` component
 */
const Duration: FunctionComponent<Props> = ({ seconds }): ReactElement<Props> => {
  const duration = date.duration(seconds, 'seconds');
  const parts = [
    {
      value: duration.days(),
      unit: 'days',
    },
    {
      value: duration.hours(),
      unit: 'hours',
    },
    {
      value: duration.minutes(),
      unit: 'minutes',
    },
    {
      value: duration.seconds(),
      unit: 'seconds',
    },
  ];

  return (
    <Box
      flexDirection="row"
      columnGap={2}
    >
      {
        // Remove the parts that have a value of `0` before a part with a
        // value greater than `0` and map each part into a part component
        parts
          .slice(Math.max(parts.findIndex((part) => part.value > 0), 0))
          .map((part) => {
            const { value, unit } = part;
            const text = value
              .toString()
              .padStart(2, '0');

            return (
              <Box
                key={`duration-part-${unit}`}
                flexDirection="row"
                columnGap={1}
              >
                <Text
                  color={colours.white}
                  backgroundColor={colours.purple}
                  underline={true}
                >
                  {` ${text} `}
                </Text>
                <Text color={colours.grey}>
                  {unit}
                </Text>
              </Box>
            );
          })
      }
    </Box>
  );
};

export default Duration;
