declare global {

  /**
   * Extension for `ObjectConstructor` to provide the
   * correct types for functions such as `.entries`
   */
  interface ObjectConstructor {
    entries<T extends object>(o: T): [keyof T, T[keyof T]][];
  }
}

export {};
