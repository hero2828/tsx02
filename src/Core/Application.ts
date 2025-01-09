import { Camera } from '@Core/Camera'
import { Renderer } from '@Core/Renderer'

import { EventEmitter } from '@Core/Tools/EventEmitter'
import { Sizes } from '@Core/Tools/Sizes'
import { Color, Scene } from 'three'
import { OrbitControls } from 'three/addons'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import Stats from 'three/addons/libs/stats.module.js'

export class Application extends EventEmitter<{
  onMouted: [scene: Scene]
  update: []
}> {
  sizes: Sizes
  gui: GUI
  stats: Stats
  orbit: OrbitControls

  renderer: Renderer
  camera: Camera
  scene: Scene

  constructor(params?: {
    renderer?: any
    camera?: any
  }) {
    super()
    this.sizes = new Sizes()
    this.gui = new GUI({ width: 200 })
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.scene = new Scene()
    this.camera = new Camera(this, { ...params?.camera })
    this.renderer = new Renderer(this, { effect: true, ...params?.renderer })

    this.orbit = new OrbitControls(this.camera.ins, this.renderer.ins.domElement)
    this.orbit.enableDamping = true
    this.orbit.enabled = false
    this.scene.background = new Color(0x000000)
    this.onMouted()
  }

  async onMouted() {
    this.tick()
    this.setGui()
    this.sizes.on('resize', () => {
      this.camera.resize()
      this.renderer.resize()
    })
  }

  setGui() {
    if (this.gui) {
      const folder = this.gui.addFolder('OrbitControls')
      folder.add(this.orbit!, 'enabled')
    }
  }

  tick() {
    this.update()
    requestAnimationFrame(this.tick.bind(this))
  }

  update() {
    this.emit('update')
    this.stats?.update()
    this.renderer.update()
  }
}
