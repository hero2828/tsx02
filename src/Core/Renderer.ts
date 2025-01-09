import type { Application } from '@Core/Application'
import { PCFSoftShadowMap, SRGBColorSpace, WebGLRenderer } from 'three'
import { EffectComposer, FilmPass, OutputPass, RenderPass } from 'three/addons'

export class Renderer {
  readonly ins: WebGLRenderer
  private readonly effecComposer: EffectComposer
  /** 是否开启特效 */
  effect: boolean = true
  constructor(private app: Application, params?: { effect?: boolean }) {
    this.effect = params?.effect ?? true

    this.ins = new WebGLRenderer({
      antialias: true,
      alpha: true,
      stencil: true,
      depth: true,
      powerPreference: 'high-performance',
    })
    document.body.appendChild(this.ins.domElement)
    this.ins.autoClear = false
    this.ins.outputColorSpace = SRGBColorSpace
    this.ins.shadowMap.enabled = true
    this.ins.shadowMap.type = PCFSoftShadowMap
    this.ins.setSize(this.app.sizes.width, this.app.sizes.height)
    this.ins.setPixelRatio(this.app.sizes.allowedPixelRatio)
    this.ins.setClearColor(0x000000, 0)
    this.ins.debug.checkShaderErrors = true

    // 特效
    this.effecComposer = new EffectComposer(this.ins)

    const renderPass = new RenderPass(this.app.scene, this.app.camera.ins)
    this.effecComposer.addPass(renderPass)
    const filmPass = new FilmPass(0.9)
    this.effecComposer.addPass(filmPass)

    const outputPass = new OutputPass()
    this.effecComposer.addPass(outputPass)

    this.setGui()
  }

  reset() {
    this.effect = true
  }

  resize() {
    this.ins.setSize(this.app.sizes.width, this.app.sizes.height)
    this.ins.setPixelRatio(this.app.sizes.allowedPixelRatio)
    this.effecComposer.setSize(this.app.sizes.width, this.app.sizes.height)
    this.effecComposer.setPixelRatio(this.app.sizes.allowedPixelRatio)
  }

  setGui() {
    if (this.app.gui) {
      const folder = this.app.gui.addFolder('Renderer')
      folder.open()

      folder.add(this, 'effect', [true, false]).name('开启特效')

      folder.add({ reset: () => this.reset() }, 'reset')
    }
  }

  update() {
    if (this.effect) {
      this.effecComposer.render()
    }
    else {
      this.ins.render(this.app.scene, this.app.camera.ins)
    }
  }
}
