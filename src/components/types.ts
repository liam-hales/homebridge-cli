/**
 * Describes a list item used for
 * the `List` component
 */
export interface ListItem {
  readonly name: string;
  readonly value: string;
}

/**
 * Describes a keybinding used for
 * the `Keybindings` component
 */
export interface Keybinding {
  readonly key: string;
  readonly action: string;
}
