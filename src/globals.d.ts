declare global {

  /**
   * Extension for `ObjectConstructor` to provide the
   * correct types for functions such as `.keys`
   */
  interface ObjectConstructor {
    keys<T extends object>(o: T): (keyof T)[];
  }
}

export {};
