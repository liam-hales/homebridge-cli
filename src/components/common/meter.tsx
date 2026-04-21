import { FunctionComponent, ReactElement, useRef, useState, useEffect } from 'react';
import { Box, Text, measureElement, DOMElement } from 'ink';
import { colours } from '../../constants.js';

/**
 * The `Meter` component props
 */
interface Props {
  readonly value: number;
  readonly min: number;
  readonly max: number;
}

/**
 * Used to render a meter for measuring a
 * scalar value within a known range
 *
 * @param props The component props
 * @returns The `Meter` component
 */
const Meter: FunctionComponent<Props> = ({ value, min, max }): ReactElement<Props> => {
  const ref = useRef<DOMElement>(null);
  const [width, setWidth] = useState<number>(0);

  /**
   * Used to set measure the outer `Box` component and
   * set the width state when the component loads
   */
  useEffect(() => {
    if (ref.current != null) {
      // Measure the element using its reference
      // and set the width state
      const { width } = measureElement(ref.current);
      setWidth(width);
    }
  }, []);

  const complete = Math.round(((value - min) / (max - min)) * width);
  const remaining = width - complete;

  return (
    <Box
      ref={ref}
      flexGrow={1}
      flexDirection="row"
    >
      {
        (complete > 0) && (
          <Text color={colours.lightGrey}>
            {'■'.repeat(complete)}
          </Text>
        )
      }
      {
        (remaining > 0) && (
          <Text color={colours.darkGrey}>
            {'■'.repeat(remaining)}
          </Text>
        )
      }
    </Box>
  );
};

export default Meter;
