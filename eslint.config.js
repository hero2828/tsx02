import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    /** 关闭元类型转换为interface */
    'ts/consistent-type-definitions': ['off'],
  },
})
