// 简化版的 Subject 实现
export class SimpleSubject<T> {
  protected observers: Array<(value: T) => void> = [];
  protected isCompleted: boolean = false;

  subscribe(cb: (value: T) => void) {
    if (this.isCompleted) {
      return {
        unsubscribe: () => {},
      };
    }

    this.observers.push(cb);

    return {
      // 取消当前订阅
      unsubscribe: () => {
        this.observers = this.observers.filter((observer) => observer !== cb);
      },
    };
  }

  next(value: T) {
    if (this.isCompleted) {
      return;
    }

    this.observers.forEach((observer) => observer(value));
  }

  complete() {
    this.isCompleted = true;
    this.observers = [];
  }
}

// 简化版的 BehaviorSubject 实现，继承自 SimpleSubject
export class SimpleBehaviorSubject<T> extends SimpleSubject<T> {
  public value: T;

  constructor(initialValue: T) {
    super();
    this.value = initialValue;
  }

  subscribe(next: (value: T) => void) {
    next(this.value); // 立即推送当前值
    return super.subscribe(next);
  }

  next(value: T) {
    this.value = value;
    super.next(value);
  }
}
