import { describe, expect, it } from 'vitest'
import { AssetsLoader } from '../AssetsLoader'
import { EventEmitter } from '../EventEmitter'
import { Sizes } from '../Sizes'

describe('发布/订阅', () => {
  const emitter = new EventEmitter<{
    update: [num: number]
    update2: [num: number, name: string]
  }>()
  it('发布', () => {
    emitter.emit('update', 1)
    emitter.emit('update2', 1, 'hero')
  })
  it('订阅', () => {
    emitter.on('update', (num) => {
      expect(num).toBe(1)
    })
    emitter.on('update2', (num, name) => {
      expect(num).toBe(1)
      expect(name).toBe('hero')
    })
  })
})

describe('资源加载器', () => {
  const loader = new AssetsLoader({
    texture: {
      boy: {
        name: 'boy',
        url: '/texture/2349.gif',
      },
      pig: {
        name: 'boy',
        url: '/texture/2383.gif',
      },
    },
    font: {
      abc: {
        name: 'abc',
        url: '/font/abc.json',
      },
    },
  })
  it('正确的纹理名称', () => {
    expect(loader.getTexture('boy')).toBe('boy')
  })
  it('错误的纹理名称', () => {
    expect(loader.getTexture('xxx')).toBe('xxx')
  })
  it('加载字体', () => {
    expect(loader.getFont('abc')).toBe('abc')
  })
})

describe('尺寸计算', () => {
  const sizes = new Sizes()
  it('计算尺寸', () => {
    sizes.on('resize', () => {
      expect(sizes.width).toEqual(1920)
      expect(sizes.height).toEqual(1080)
    })
  })
})
