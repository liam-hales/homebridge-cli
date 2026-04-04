/**
 * Used to create a map type from a
 * given object type and index key
 *
 * - Generic type `T` for the type to map
 * - Generic type `U` for the index key
 */
export type Map<
  T extends Readonly<Record<U, string>>,
  U extends keyof T,
> = {
  [K in T[U]]: Extract<
    T,
    Readonly<Record<U, K>>
  >;
};
