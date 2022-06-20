import  { retry } from "./retry";
import  { config } from "./config";

/**
 * @param {object} obj - Optional argment - 可选参数选项。
 * @param {Function} obj.func - A function returns a promise - 一个要执行promise的函数。
 * @param {Array<any>} obj.args - Optional. Function agrments - 可选。传递给函数的参数。
 * @param {any} obj.ctx - A function returns a promise - 执行函数上下文。
 * @param {any} obj.defaultValue - Optional. Return a default value when promise is rejected. - 可选。默认为null。当promise为rejected时返回的值。
 * @param {number} obj.times - Optional. Retry times - 可选。重试次数。
 * @param {interval} obj.interval - Optional. Retry interval - 可选。重试时间间隔。
 * @param {Function} obj.beforeReturnData - Optional. Provide a function to wrap resolved value before return. - 可选。提供一个函数在返回之前去处理resolved值。
 * @returns Promise
 */
export async function retryToData<T, Y = T>(obj: {
  func: (() => Promise<T>) | ((...args: any[]) => Promise<T>),
  args?: Array<any>,
  ctx?: any,
  defaultValue?: any,
  times?: number,
  interval?: number,
  beforeReturnData?: (data: T) => Y,
}): Promise<T | Y | null> {
  const { 
    defaultValue = config.defaultValue,
    ...passed
  } = obj;
  const [error, data, success] = await retry<T, Error, Y>(passed);
  return success ? data : defaultValue;
}