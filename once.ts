type Arr = readonly unknown[];

export function toOnce<T extends Arr, R>(
  func: (...args: T) => R,
  elseFunc?: (...args: T) => R
): (...args: T) => R {
  let result: R;
  let callNoop = (): R => {
    return result;
  };
  let call = (...args: T): R => {
    result = func(...args);
    if (elseFunc) {
      call = elseFunc;
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

