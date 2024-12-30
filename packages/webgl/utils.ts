// import { Vector3 } from 'https://unpkg.com/three/build/three.module.js';
import { Vector3 } from 'three';

function updateProgramAndShaders(gl: WebGLRenderingContext, vsSource = '', fsSource = '') {
  //创建程序对象
  const program = gl.createProgram()!;
  //建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //把顶点着色对象装进程序对象中
  gl.attachShader(program, vertexShader);
  //把片元着色对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  //连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    (gl as any).program = program;
    gl.useProgram(program);
    return true;
  }
  return false;
}

/**
 * * 通用通过顶点绘制函数,重要函数
 * @param gl WebGL上下文
 * @param program 着色器程序
 * @param vertices 顶点数据
 * @param drawMode 绘制模式
 * @param count 顶点个数
 */
function drawGraphicFromPosition(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  vertices: Float32Array,
  drawMode: number = gl.TRIANGLES,
  count: number
) {
  // 1. 创建和绑定缓冲区
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 2. 设置顶点属性
  const positionAttributeLocation = gl.getAttribLocation(program, "a_Position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // 3. 绘制
  gl.drawArrays(drawMode, 0, count);
}

function initProgramAndShaders(gl: WebGLRenderingContext) {
  const vsSource = `
    attribute vec4 a_Position;
    void main() {
      gl_Position = a_Position;
    }
  `
  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
  return updateProgramAndShaders(gl, vsSource, fsSource)
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  // 创建程序对象
  const program = gl.createProgram()!;
  // 建立着色器对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)!;
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)!;
  // 把顶点着色器对象装进程序对象中
  gl.attachShader(program, vertexShader);
  // 把片元着色器对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  // 连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  return program
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type)!;
  //将着色器源文件传入着色器对象中
  gl.shaderSource(shader, source);
  //编译着色器对象
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  } else {
    return false
  }
}

function getMousePosInWebgl({ clientX, clientY }: { clientX: number, clientY: number }, canvas: HTMLCanvasElement) {
  //鼠标在画布中的css位置
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const [cssX, cssY] = [clientX - left, clientY - top];
  //解决坐标原点位置的差异
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  const [xBaseCenter, yBaseCenter] = [
    cssX - halfWidth,
    cssY - halfHeight,
  ];
  // 解决y 方向的差异
  const yBaseCenterTop = -yBaseCenter;
  //解决坐标基底的差异
  return {
    x: xBaseCenter / halfWidth,
    y: yBaseCenterTop / halfHeight
  }
}

function glToCssPos({ x, y }: { x: number, y: number }, { width, height }: { width: number, height: number }) {
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  return {
    x: x * halfWidth,
    y: -y * halfHeight
  }
}

//线性比例尺
function ScaleLinear(ax: number, ay: number, bx: number, by: number) {
  const delta = {
    x: bx - ax,
    y: by - ay,
  };
  const k = delta.y / delta.x;
  const b = ay - ax * k;
  return function (x: number) {
    return k * x + b;
  };
}

/* 正弦函数 */
function SinFn(a: number, Omega: number, phi: number) {
  return function (x: number) {
    return a * Math.sin(Omega * x + phi);
  }
}

/* GetIndexInGrid
  在由一维数组建立的栅格矩阵中，基于行列获取元素的索引位置
*/
function GetIndexInGrid(w: number, size: number) {
  return function (x: number, y: number) {
    return (y * w + x) * size
  }
}

/* 对Image 加载事件的封装 */
function imgPromise(img: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve(img);
    }
    img.onerror = function () {
      reject(new Error('图片加载失败'));
    }
  });
}

/* 解析渐变节点 */
function parseColorStops(source: any[]) {
  const stops = new Array(16).fill(-1);
  source.forEach(({ color, stop }: { color: any[], stop: number }, stopInd: number) => {
    let rgb = '';
    let ar = '';
    color.forEach((ele: any, ind: number) => {
      //1 1001 '1001' '001'
      const str = (ele + 1000).toString().slice(1);
      if (ind < 3) {
        rgb += str;
      } else {
        ar += str;
      }
    })
    ar += (Math.round(stop * 255) + 1000).toString().slice(1);
    stops[stopInd * 2] = rgb;
    stops[stopInd * 2 + 1] = ar;
  })
  return stops;
}

const isPC = () => !navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

function worldPos({ clientX, clientY }: { clientX: number, clientY: number }, canvas: HTMLCanvasElement, pvMatrix: any) {
  const [hw, hh] = [canvas.width / 2, canvas.height / 2]
  // 裁剪空间位
  const cp = new Vector3(
    (clientX - hw) / hw,
    -(clientY - hh) / hh,
    0
  )
  // 鼠标在世界坐标系中的位置
  return cp.applyMatrix4(
    pvMatrix.clone().invert()
  )
}

function clearWebglBackground(gl: WebGLRenderingContext, color?: number[]) {
  gl.clearColor(color?.[0] ?? 0.0, color?.[1] ?? 0.0, color?.[2] ?? 0.0, color?.[3] ?? 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export {
  imgPromise,
  initProgramAndShaders,
  updateProgramAndShaders,
  createProgram,
  getMousePosInWebgl,
  glToCssPos,
  ScaleLinear,
  SinFn,
  GetIndexInGrid,
  parseColorStops,
  isPC,
  worldPos,
  clearWebglBackground,
  drawGraphicFromPosition
};
