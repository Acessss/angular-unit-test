import { defer, Observable } from 'rxjs';

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T): Observable<T> {
  /**
   * RxJS 的 defer() 操作符返回一个可观察对象。它的参数是一个返回 Promise 或可观察对象的工厂函数。
   * 当某个订阅者订阅 defer 生成的可观察对象时，defer 就会调用此工厂函数生成新的可观察对象，并让该订阅者订阅这个新对象。
   * defer() 操作符会把 Promise.resolve() 转换成一个新的可观察对象，它和 HttpClient 一样只会发送一次然后立即结束（complete）。
   * 这样，当订阅者收到数据后就会自动取消订阅。
   */
  return defer(() => Promise.resolve(data));
}

/**
 * Create async observable error that errors
 * after a JS engine turn
 */
export function asyncError<T>(errorObject: any): Observable<T> {
  return defer(() => Promise.reject(errorObject));
}
