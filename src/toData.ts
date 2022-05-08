import  { to } from './to';
import  { config } from "./config";

/**
 * @param {Promise} promise - The promise you want to execute. - 要执行的Promise。
 * @param {any} [defaultValue=null] - Optional. Return a default value when promise is rejected. - 可选，默认为null。当promise为rejected时返回的值。
 * @param {Function} beforeReturnData - Optional. Provide a function to wrap resolved value before return. - 可选。提供一个函数在返回之前去处理resolved值。
 * @returns Promise
 */
export async function toData<T, Y = T>(
  promise: Promise<T>,
  defaultValue: any = config.defaultValue,
  beforeReturnData?: (data: T) => Y
): Promise<T | Y | null> {
  const [error, data, success] = await to<T, Error, Y>(promise);
  let value = success ? data : defaultValue;
  if (!!beforeReturnData) {
    value = beforeReturnData(value);
  }
  return value;
}