import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json' assert { type: "json" }

export default {
  input: 'src/index.ts', // 入口文件
  output: [
    {
      file: pkg.main,
      format: 'cjs', // CommonJS 格式
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es', // ES Module 格式
      sourcemap: true,
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
    }),
    resolve(), // 解析第三方依赖
    commonjs(), // 将 CommonJS 转换为 ES Module
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})], // 排除外部依赖
}
