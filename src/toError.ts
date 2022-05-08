import  { to } from './to';

/**
 * @param {Promise} promise - The promise you want to execute. - 要执行的Promise。
 * @param {object} errorExt - Optional. Additional Information you can pass to the err object. - 可选。追加给错误的额外信息。
 * @returns Promise
 */
export async function toError<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<U | null> {
  const [error] = await to<T, U>(promise, errorExt);
  return error;
}