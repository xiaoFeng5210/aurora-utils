import { useEffect } from 'react';
import { webglUtils } from '../../dist/index.esm.js';

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl');
    const result = webglUtils.initProgramAndShaders(gl)
    if (result) {
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

  return (
    <div className="App">
      <div className="actions">

      </div>
      <canvas id="canvas" width="500px" height="500px">
      </canvas>
    </div>
  )
}

export default App
