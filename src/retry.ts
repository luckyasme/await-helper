import  { to } from './to';
import  { delay } from './delay';
import  { config } from "./config";

/**
 * @param {object} obj - optional argment - 可选参数选项。
 * @param {Function} obj.func - A function returns a promise - 一个要执行promise的函数。
 * @param {Array<any>} obj.args - Optional. Function agrments - 可选。传递给函数的参数。
 * @param {object} errorExt - Optional. Additional Information you can pass to the err object. - 可选。追加给错误的额外信息。
 * @param {number} obj.times - Optional. Retry times - 可选。重试次数。
 * @param {interval} obj.interval - Optional. Retry interval - 可选。重试时间间隔。
 * @param {Function} obj.beforeReturnData - Optional. Provide a function to wrap resolved value before return. - 可选。提供一个函数在返回之前去处理resolved值。
 * @returns Promise
 */
export async function retry<T, U = Error, Y = T>(obj: {
  func: (...args: Array<any>) => Promise<T>,
  args?: Array<any>,
  errorExt?: object,
  times?: number,
  interval?: number,
  beforeReturnData?: (data: T) => Y,
}): Promise<[null, T | Y, boolean] | [U, null, boolean]> {

  const {
    func,
    args = [],
    errorExt = {},
    times = config.retryTimes,
    interval = 0,
    beforeReturnData,
  } = obj;

  if (!func) {
    return [null, null, false];
  }

  let count = times;
  count = !isNaN(count) && count >= 0 ? count : 1;

  while((count--) >= 0) {
    const [error, data, success] = await to<T, U, Y>(func(...args), errorExt, beforeReturnData);
    if (success || count < 0) {
      return [error, data, success] as [null, T | Y, boolean] | [U, null, boolean];
    }

    if (interval > 0) {
      await delay(interval);
    }
  }

}

