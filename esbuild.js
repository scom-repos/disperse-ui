const Fs = require('fs');
const { promises: fs } = require("fs")

const GlobalBuildModuleList = [
  {
    sourceFilePath: 'src/assets/index.ts',
    distFilePath: './dist/assets/index.js',
    moduleName: '@disperse/assets'
  },
  {
    sourceFilePath: 'src/global/index.ts',
    distFilePath: './dist/global/index.js',
    moduleName: '@disperse/global'
  },
  {
    sourceFilePath: 'src/store/index.ts',
    distFilePath: './dist/store/index.js',
    moduleName: '@disperse/store'
  },
  {
    sourceFilePath: 'src/common/index.ts',
    distFilePath: './dist/common/index.js',
    moduleName: '@disperse/common'
  },
  {
    sourceFilePath: 'src/main/index.tsx',
    distFilePath: './dist/main/index.js',
    moduleName: '@disperse/main'
  },
  {
    sourceFilePath: 'src/disperse-utils/index.ts',
    distFilePath: './dist/disperse-utils/index.js',
    moduleName: '@disperse/disperse-utils'
  },
]

const GlobalModuleESBuildConfig = {
  entryPoints: GlobalBuildModuleList.map(v => v.sourceFilePath),
  external: [
    '@ijstech/components',
    '@ijstech/eth-wallet',
    '@scom/disperse-sdk',
    '@disperse/global',
    '@disperse/store',
    '@disperse/assets',
    '@disperse/main',
    '@disperse/disperse-utils',
  ]
}

async function readFile(fileName) {
  return new Promise((resolve, reject) => {
      Fs.readFile(fileName, 'utf8', function (err, data) {
          if (err)
              reject(err)
          else
              resolve(data)
      })
  })
}

async function writeContent(filePath, moduleName) {
  let content = await readFile(filePath);
  content = `define("${moduleName}",(require, exports)=>{
  ${content}  
  });`
  Fs.writeFileSync(filePath, content);
}

async function buildSDKs() {
  const SDKList = [
  './node_modules/@openswap/sdk/dist/index.js',
  './node_modules/@scom/disperse-sdk/dist/index.js'
  ]
  let promises = [];
  for (let sdk of SDKList) {
    promises.push(readFile(sdk));
  }

  let content = '';
  await fs.mkdir('./dist/sdks', { recursive: true });
  await Promise.all(promises).then((dataArr) => {
    for (let data of dataArr) {
      content += data + ';';
    }
  })
  Fs.writeFileSync('./dist/sdks/index.js', content);
};

async function buildGlobalModule() {
  await require('esbuild').build({
    ...GlobalModuleESBuildConfig,
    outdir: 'dist',
    bundle: true,
    minify: false,
    format: 'cjs',
    target: 'ES2017',
    jsx: 'transform',
    plugins: [],
  }).catch(() => process.exit(1));

  await Promise.all(GlobalBuildModuleList.map(v => writeContent(v.distFilePath, v.moduleName)));
  await buildSDKs();
}

async function buildLocalModule() {
  require('esbuild').build({
    entryPoints: [
      'src/disperse/index.tsx',
    ],
    external: [
      '@ijstech/components',
      '@ijstech/eth-wallet',
      '@scom/disperse-sdk',
      '@disperse/assets',
      '@disperse/global',
      '@disperse/store',
      '@disperse/common',
      '@disperse/main',
      '@disperse/disperse-utils',
    ],
    outdir: 'dist/disperse',
    bundle: true,
    minify: false,
    format: 'iife',
    target: 'ES2017',
    jsx: 'transform',
    plugins: [],
  }).catch(() => process.exit(1));
}

buildLocalModule();
buildGlobalModule();