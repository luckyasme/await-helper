import  { config } from "./config";

/**
 * @param {Promise} promise - The promise you want to execute. - 要执行的Promise。
 * @param {object} errorExt - Optional. Additional Information you can pass to the err object. - 可选。追加给错误的额外信息。
 * @param {Function} beforeReturnData - Optional. Provide a function to wrap resolved value before return. - 可选。提供一个函数在返回之前去处理resolved值。
 * @returns Promise
 */
export async function to<T, U = Error, Y = T>(
  promise: Promise<T>,
  errorExt?: object,
  beforeReturnData?: (data: T) => Y
): Promise<[null, T | Y, boolean] | [U, null, boolean]> {
  try {
    let data: T | Y = await promise;
    beforeReturnData && (data = beforeReturnData(data));
    return [null, data, true];
  } catch (err) {
    let error;
    if (errorExt) {
      error = err ? Object.assign(err, errorExt) : Object.assign({}, errorExt);
    } else {
      error = err;
    }
    config.error && config.error(err);
    return [error, null, false];
  }
}
