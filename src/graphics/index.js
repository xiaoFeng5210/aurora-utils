/**
 * 
 * @param x 向量x
 * @param y 向量y
 * @returns 
 */
export function vectorLength(x, y) {
  return Math.sqrt(x * x + y * y);
}

/**
 * 向量加法
 */
export function vectorAdd(v1, v2) {
  if (v1.length !== 2 || v2.length !== 2) {
    throw new Error('2个向量长度必须为2');
  }
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

/**
 * 向量数乘
 */
export function vectorMulti(v, num) {
  return [v[0] * num, v[1] * num];
}

/**
 * 向量点积
 */
export function vectorDot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}
