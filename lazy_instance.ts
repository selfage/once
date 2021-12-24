import { OnceCaller } from "./caller";

export class LazyInstance<T> {
  private onceCaller: OnceCaller<[], T>;

  public constructor(constructFn: () => T) {
    this.onceCaller = new OnceCaller(constructFn);
  }

  public get(): T {
    return this.onceCaller.call();
  }
}
