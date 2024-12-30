import { useEffect } from 'react';
import { webglUtils } from '../../dist/index.esm.js';

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl');
    const result = webglUtils.initProgramAndShaders(gl)
    if (result) {
      webglUtils.clearWebglBackground(gl, [0.0, 0.0, 0.0, 1.0])
      const program = gl!.program

      // 4. 创建三角形顶点数据
      const vertices = new Float32Array([
        0.0, 0.5,    // 顶点1
        -0.5, -0.5,  // 顶点2
        0.5, -0.5    // 顶点3
      ]);
    }
  }, [])

  return (
    <div className="App">
      <canvas id="canvas" width="500px" height="500px">
      </canvas>
    </div>
  )
}

export default App
