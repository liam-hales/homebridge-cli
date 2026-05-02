import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { Picker } from '../index.js';
import { PickerItem } from '../types.js';
import { colours } from '../../constants.js';

/**
 * The `ConfirmPrompt` component props
 */
interface Props {
  readonly title?: string;
  readonly onConfirm: (answer: 'yes' | 'no') => void;
}

/**
 * Used to render a confirmation prompt allowing
 * the user to select either "yes" or "no"
 *
 * @param props The component props
 * @returns The `ConfirmPrompt` component
 */
const ConfirmPrompt: FunctionComponent<Props> = ({ title, onConfirm }): ReactElement<Props> => {
  const items: PickerItem[] = [
    {
      name: 'yes',
    },
    {
      name: 'no',
    },
  ];

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      {
        (title != null) && (
          <Text
            color={colours.lightGrey}
            bold={true}
          >
            {title}
          </Text>
        )
      }
      <Picker
        items={items}
        selectKey="return"
        onSelect={(item) => {
          const { name } = item;
          const answer = (name === 'yes')
            ? 'yes'
            : 'no';

          onConfirm(answer);
        }}
      />
    </Box>
  );
};

export default ConfirmPrompt;
