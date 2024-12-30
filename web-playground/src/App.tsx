import { useEffect, useState } from 'react';
import { webglUtils } from '../../dist/index.esm.js';

function App() {
  const [glObj, setGlObj] = useState<WebGLRenderingContext | null>(null)
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl');
    const result = webglUtils.initProgramAndShaders(gl)
    if (result) {
      setGlObj(gl)
      const program = gl!.program

      // 4. 创建三角形顶点数据
      const vertices = new Float32Array([
        0.0, 0.5,    // 顶点1
        -0.5, -0.5,  // 顶点2
        0.5, -0.5    // 顶点3
      ]);

      const pointerBuffer = gl!.createBuffer() // 创建缓冲区
      gl!.bindBuffer(gl!.ARRAY_BUFFER, pointerBuffer) // 绑定缓冲区
      gl!.bufferData(gl!.ARRAY_BUFFER, vertices, gl!.STATIC_DRAW)

      const positionAttributeLocation = gl!.getAttribLocation(program, "a_Position")
      gl!.enableVertexAttribArray(positionAttributeLocation) // 启用顶点属性
      gl!.vertexAttribPointer(positionAttributeLocation, 2, gl!.FLOAT, false, 0, 0) // 指定顶点数据

      webglUtils.clearWebglBackground(gl, [0.0, 0.0, 0.0, 1.0])
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }
  }, [])

  function drawRectFromWebgl() {
    if (!glObj) return
    const gl = glObj
    const program = gl!.program

    const vertices = new Float32Array([
      -0.5, 0.5,   // 左上
      -0.5, -0.5,  // 左下
      0.5, 0.5,    // 右上
      0.5, -0.5    // 右下
    ]);

    const pointerBuffer = gl!.createBuffer() // 创建缓冲区
    gl!.bindBuffer(gl!.ARRAY_BUFFER, pointerBuffer) // 绑定缓冲区
    gl!.bufferData(gl!.ARRAY_BUFFER, vertices, gl!.STATIC_DRAW)

    const positionAttributeLocation = gl!.getAttribLocation(program, "a_Position")
    gl!.enableVertexAttribArray(positionAttributeLocation) // 启用顶点属性
    gl!.vertexAttribPointer(positionAttributeLocation, 2, gl!.FLOAT, false, 0, 0) // 指定顶点数据
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
  }

  function clearAll() {
    webglUtils.clearWebglBackground(glObj, [0.0, 0.0, 0.0, 1.0])
  }

  return (
    <div className="App">
      <div className="actions">
        <button onClick={clearAll}>
          清除画布
        </button>

        <button onClick={drawRectFromWebgl}>
          画一个矩形
        </button>
      </div>
      <canvas id="canvas" width="500px" height="500px">
      </canvas>
    </div>
  )
}

export default App
