import { useEffect } from 'react';
import { add } from '../../dist/index.esm.js';

function App() {
  function plus() {
    console.log(add(1, 2));
  }
  useEffect(() => {
    plus();
  }, [])
  return (
    <>
      测试网页
    </>
  )
}

export default App
