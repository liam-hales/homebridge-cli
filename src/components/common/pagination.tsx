import { FunctionComponent, ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';

/**
 * The `Pagination` component props
 */
interface Props {
  readonly page: number;
  readonly totalPages: number;
}

/**
 * Used to render a row of page numbers
 * with the current page highlighted
 *
 * @param props The component props
 * @returns The `Pagination` component
 */
const Pagination: FunctionComponent<Props> = ({ page, totalPages }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="row"
      columnGap={1}
    >
      {
        [...Array(totalPages)].map((_, index) => (
          <Text
            key={`pagination-page-${index}`}
            bold={index === page}
            underline={index === page}
            color={
              (index === page)
                ? colours.purple
                : colours.lightGrey
            }
          >
            {index + 1}
          </Text>
        ))
      }
    </Box>
  );
};

export default Pagination;
