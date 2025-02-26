/**
 * 找数组的最后几位元素
 */
export function last<T>(arr: T[], n?: number): T[] {
  if (!Array.isArray(arr)) {
    throw new Error('第一个参数必须是数组')
  }
  if (arr.length === 0) {
    return []
  }
  if (n === undefined) {
    return [arr[arr.length - 1]]
  }
  if (arr.length > 0) {
    if (n < 0) {
      return [];
    }
    if (n === 0) {
      return [];
    }
    if (n === 1) {
      return [arr[arr.length - 1]]
    }
    if (n > 1 && n < arr.length) {
      return arr.slice(arr.length - n, arr.length);
    }
    if (n >= arr.length) {
      return arr;
    }
  }
  return []
}


/**
 * 完成后端语法选取数组。-1表示最后一位，-2表示倒数第二位，以此类推。参数是一个负数，则表示从后往前数。参数是正整数，则表示从前往后数。
 */
export function arrAt<T>(arr: T[], index: number): T {
  if (!Array.isArray(arr)) {
    throw new Error('第一个参数必须是数组')
  }
  // 判断index是整数，不是浮点数
  if (!Number.isInteger(index)) {
    throw new Error('第二个参数必须是正整数或者负整数')
  }
  if (index < 0 && index >= -arr.length) {
    return arr[arr.length + index]
  }
  if (index >= arr.length) {
    return arr[arr.length - 1]
  }
  if (index < -arr.length) {
    return arr[0]
  }
  return arr[index]
}

interface CustomSortConditions {
  [key: string]: number
}
/**
 * 数组根据条件排序, 自定义排序
 * conditions: 条件
 */
export function customSort<T>(arr: T[], conditions: CustomSortConditions) {
  // 根据conditions，里面的key是arr数组里的对象的值，值会对应着0，1，2，3，4，5.
}

