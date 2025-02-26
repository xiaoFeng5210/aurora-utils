/**
 * 找数组的最后几位元素
 * @param arr 数组
 * @param n 获取元素的数量，默认为1
 * @returns 返回数组的最后n个元素组成的数组
 */
export function last<T>(arr: T[], n?: number): T[] {
  // 参数校验
  if (!Array.isArray(arr)) {
    throw new Error('第一个参数必须是数组')
  }

  // 处理空数组
  if (arr.length === 0) {
    return []
  }

  // 未指定n时，返回最后一个元素
  if (n === undefined) {
    return [arr[arr.length - 1]]
  }

  // 处理n的各种情况
  if (n <= 0) {
    return []
  }

  if (n === 1) {
    return [arr[arr.length - 1]]
  }

  if (n >= arr.length) {
    return [...arr]
  }

  // 返回最后n个元素
  return arr.slice(arr.length - n)
}

/**
 * 完成后端语法选取数组。-1表示最后一位，-2表示倒数第二位，以此类推。
 * 参数是一个负数，则表示从后往前数。参数是正整数，则表示从前往后数。
 * @param arr 数组
 * @param index 索引，可以是正数或负数
 * @returns 返回指定位置的元素
 */
export function arrAt<T>(arr: T[], index: number): T {
  // 参数校验
  if (!Array.isArray(arr)) {
    throw new Error('第一个参数必须是数组')
  }

  // 判断index是整数，不是浮点数
  if (!Number.isInteger(index)) {
    throw new Error('第二个参数必须是正整数或者负整数')
  }

  // 处理负数索引（从后往前数）
  if (index < 0) {
    // 如果负数索引在范围内
    if (index >= -arr.length) {
      return arr[arr.length + index]
    }
    // 如果负数索引超出范围，返回第一个元素
    return arr[0]
  }

  // 处理正数索引（从前往后数）
  // 如果索引超出范围，返回最后一个元素
  if (index >= arr.length) {
    return arr[arr.length - 1]
  }

  // 正常返回指定索引的元素
  return arr[index]
}

interface CustomSortConditions {
  [key: string]: number
}

/**
 * 数组根据条件排序, 自定义排序
 * @param arr 要排序的数组
 * @param conditions 排序条件，key是数组元素的值，value是排序权重
 * @param property 如果数组元素是对象，指定用于排序的属性名
 * @returns 排序后的新数组
 */
export function customSort<T extends string | number | Record<string, any>>(
  arr: T[],
  conditions: CustomSortConditions,
  property?: string
): T[] {
  if (!Array.isArray(arr)) {
    throw new Error('第一个参数必须是数组')
  }

  if (!conditions || typeof conditions !== 'object') {
    throw new Error('第二个参数必须是对象')
  }

  // 创建原始数组的索引映射，用于保持相同权重元素的原始顺序
  const originalIndices = new Map<T, number>();
  arr.forEach((item, index) => {
    originalIndices.set(item, index);
  });

  // 创建数组副本，避免修改原数组
  return [...arr].sort((a, b) => {
    // 获取用于排序的值
    let valueA: string;
    let valueB: string;

    if (property && typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
      // 如果是对象数组，并且指定了属性，则使用该属性的值
      valueA = String(a[property] ?? '');
      valueB = String(b[property] ?? '');
    } else {
      // 否则直接使用元素值
      valueA = String(a);
      valueB = String(b);
    }

    // 获取排序权重，如果不存在则使用最大值（放到最后）
    const weightA = conditions[valueA] !== undefined ? conditions[valueA] : Number.MAX_SAFE_INTEGER;
    const weightB = conditions[valueB] !== undefined ? conditions[valueB] : Number.MAX_SAFE_INTEGER;

    // 按权重升序排列
    if (weightA !== weightB) {
      return weightA - weightB;
    }

    // 如果权重相同，保持原有顺序
    return originalIndices.get(a)! - originalIndices.get(b)!;
  });
}

