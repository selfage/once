type Arr = readonly unknown[];

export class OnceCaller<T extends Arr, R> {
  public call = this.callFirstTime;

  private result: R;

  public constructor(
    private func: (...args: T) => R,
    private elseFunc?: (...args: T) => R
  ) {}

  private callFirstTime(...args: T): R {
    this.result = this.func(...args);
    if (this.elseFunc) {
      this.call = this.elseFunc;
    } else {
      this.call = this.callNoop;
    }
    return this.result;
  }

  private callNoop(): R {
    return this.result;
  }

  public reset(): void {
    this.call = this.callFirstTime;
  }
}

export class OnceCallerOrError<T extends Arr, R> {
  // this.fail can be passed directly because it doesn't use any class member.
  private onceCaller = new OnceCaller<T, R>(this.func, this.fail);

  public constructor(private func: (...args: T) => R) {}

  public call(...args: T): R {
    return this.onceCaller.call(...args);
  }

  private fail(): R {
    throw new Error("Function is expected to be called only once.");
  }

  public reset(): void {
    this.onceCaller.reset();
  }
}

