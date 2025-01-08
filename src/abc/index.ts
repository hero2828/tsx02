export class Abc<T extends Record<string, any>> {
  constructor(public params: { texture: T }) {}

  getAbc<K extends keyof T>(key: K): T[K] {
    console.warn(key)
    return this.params.texture[key]
  }
}

const abc = new Abc({ texture: {
  a: '1',
  b: '2',
  c: '3',
} })

abc.getAbc('a')
