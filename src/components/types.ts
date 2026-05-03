import type { Date } from '../date.js';

/**
 * Describes the list data used for
 * the `TextList` component
 */
export type TextListData = Record<string, string | number | boolean | Date>;

/**
 * Describes the table item used for
 * the `Table` component
 */
export type TableItem = Record<string, string | number | boolean | Date>;

/**
 * Used to map object keys to optional
 * value formatter functions
 *
 * - Generic type `T` for the object
 */
export type ValueFormatters<T extends object> = Partial<
  {
    readonly [K in keyof T]: (value: T[K]) => string;
  }
>;

/**
 * Describes a keybinding used for
 * the `Keybindings` component
 */
export interface Keybinding {
  readonly key: string;
  readonly action: string;
}

/**
 * Describes a picker item used
 * for the `Picker` component
 */
export interface PickerItem {
  readonly name: string;
  readonly description?: string;
}
