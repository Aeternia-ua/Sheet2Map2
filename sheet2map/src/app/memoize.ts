import {Observable} from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';

export function Memoized() {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const method = descriptor.value; // references the method being decorated
    const cacheMember = propertyKey + 'CacheMember';

    // the Observable function
    if (!descriptor.value) {
      throw new Error('use MemoizeDecorator only on services methods');
    }

    descriptor.value = function(...args) {
      if (!target[cacheMember]) {
        const returnedObservable = method.apply(this, args);
        if (!(returnedObservable instanceof Observable)) {
          throw new Error(
            `method decorated with Memoized Decorator must return Observable`
          );
        }

        target[cacheMember] = returnedObservable.pipe(
          publishReplay(),
          refCount()
        );
      }

      return target[cacheMember];
    };
  };
}
