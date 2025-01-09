import type { Application } from '@Core/Application'
import { PerspectiveCamera } from 'three'

export class Camera {
  readonly ins: PerspectiveCamera
  constructor(private app: Application, params?: {
    position?: [number, number, number]
  }) {
    this.ins = new PerspectiveCamera(75, this.app.sizes.aspectRatio, 0.1, 1000)
    if (params?.position) {
      this.ins.position.set(params.position[0], params.position[1], params.position[2])
    }
    else {
      this.ins.position.set(0, 0, 2)
    }
  }

  resize() {
    this.ins.aspect = this.app.sizes.aspectRatio
    this.ins.updateProjectionMatrix()
  }
}
