import { Application } from '@Core/Application'
import { AssetsLoader } from '@Core/Tools/AssetsLoader'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const app = new Application({ camera: {
  position: [0, 0, 3],
} })
const assets = new AssetsLoader({
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

let cube: Mesh
assets.on('mounted', () => {
  const tex1 = assets.getTexture('boy')
  cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ map: tex1 }),
  )
  app.scene.add(cube)
})

app.on('update', () => {
  if (cube) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }
})
