import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json' assert { type: "json" }

export default {
  input: 'packages/index.ts',
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
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      sourcemap: true,
      name: 'AuroraUtils',
      globals: {
        three: 'THREE',
      },
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      declarationMap: true,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.js'],
      presets: [
        ['@babel/preset-env', {
          targets: {
            ie: '11',
            edge: '17',
            firefox: '60',
            chrome: '67',
            safari: '11.1',
          },
          useBuiltIns: 'entry', // entry是直接使用，usage需要引入core-js
          corejs: 3,
        }],
        '@babel/preset-typescript'
      ],
      exclude: 'node_modules/**'
    }),

    resolve(), // 解析第三方依赖
    commonjs(), // 将 CommonJS 转换为 ES Module
    visualizer({
      filename: 'stats.html',
      open: true
    })
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})], // 排除外部依赖
}
