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


/**
 * 向量夹角cos值
 */
export function calCos(a, b) {
  let dotProduct = vectorDot(a, b);
  let d = Math.sqrt(a[0] * a[0] + a[1] * a[1]) * Math.sqrt(b[0] * b[0] + b[1] * b[1]);
  return dotProduct / d;
}

/**
 * 计算 点1指点2形成 的向量
 */
export function getCosBy2pt(x, y, cx, cy) {
  let a = [x - cx, y - cy];
  let b = [0, -1];
  return calCos(a, b);
}

/**
 * 求旋转角度
 * @param cx 
 * @param cy 
 * @param x 
 * @param y 
 * @returns 
 */
export function calAngle(cx, cy, x, y) {
  const radian = getCosBy2pt(x, y, cx, cy);
  let angle = Math.acos(radian) * 180 / Math.PI;
  if (x < cx) angle = -angle;
  return angle;
}
