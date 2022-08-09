const args = require('minimist')(process.argv.slice(2))   // 可以解析命令行参数
const path = require('path')

const target = args._[0] || 'reactivity'

const format = args.f || 'global'

// 打包
// 入口位置
const entry = path.resolve(__dirname, `../packages/${target}/src/index.ts`)

// 打包成后的包名
const packageName = require(path.resolve(__dirname, `../packages/${target}/package.json`)).buildOptions.name

// 打包成下面3种格式
// iife 自执行函数   const Vue = (function(){})()  增加一个全局变量
// cjs commonjs 规范
// esm es6Module

// 输出格式
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'
// 出口
const outfile = path.resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)


// 打包
const { build } = require('esbuild')

build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  sourcemap: true,
  format: outputFormat,
  globalName: packageName,
  watch: { // 监听文件变化
    onRebuild(error) {
      if(!error) console.log('rebuilt~~~')
    }
  }
}).then(() => {
  console.log('watching~~~')
})