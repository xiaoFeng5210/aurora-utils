// 画圆的glsl代码
export function circleSharder(params: string) {
  return `
     float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
     if (dist < 0.5) {
       gl_FragColor = ${params};
     } else {
      discard;
     }
   `
}
