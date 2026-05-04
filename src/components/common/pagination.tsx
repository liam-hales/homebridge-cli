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
        [...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Text
              key={`pagination-page-${index}`}
              bold={pageNumber === page}
              underline={pageNumber === page}
              color={
                (pageNumber === page)
                  ? colours.purple
                  : colours.lightGrey
              }
            >
              {pageNumber}
            </Text>
          );
        })
      }
    </Box>
  );
};

export default Pagination;
