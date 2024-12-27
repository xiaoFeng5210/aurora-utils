/**
 * 找数组的最后几位元素
 */
export function last(arr: any[], n: number) {
  if (!Array.isArray(arr)) {
    throw new Error('第一个参数必须是数组')
  }
  if (arr.length === 0) {
    return undefined
  }
  if (n === undefined) {
    return arr[arr.length - 1];
  }
  if (arr.length >= 0) {
    if (n < 0) {
      return [];
    }
    if (n === 0) {
      return [];
    }
    if (n === 1) {
      return arr[arr.length - 1];
    }
    if (n > 1 && n < arr.length) {
      return arr.slice(arr.length - n, arr.length);
    }
    if (n >= arr.length) {
      return arr;
    }
  }
}
