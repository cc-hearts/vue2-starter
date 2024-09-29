module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "vue",
    "ts"
  ],
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  "transform": {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    ".*\\.(js)$": "babel-jest",
    "^.+\.tsx?$": "ts-jest",
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}
