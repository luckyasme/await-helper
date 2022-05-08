
/**
 * @param {number} time - 延迟时间
 * @returns Promise
 */
export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}