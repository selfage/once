type Arr = readonly unknown[];

export function toOnce<T extends Arr, R>(
  func: (...args: T) => R,
  altFunc?: (...args: T) => R
): (...args: T) => R {
  let result: R;
  let callNoop = (): R => {
    return result;
  };
  let call = (...args: T): R => {
    result = func(...args);
    if (altFunc) {
      call = altFunc;
    } else {
      call = callNoop;
    }
    return result;
  };
  return (...args: T): R => {
    return call(...args);
  };
}

export function toOnceOrError<T extends Arr, R>(
  func: (...args: T) => R
): (...args: T) => R {
  let fail = (): R => {
    throw new Error("Function is expected to be called only once.");
  };
  return toOnce(func, fail);
}
