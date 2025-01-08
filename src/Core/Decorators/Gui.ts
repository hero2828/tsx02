export function GuiHelper(xyz: string = 'xyz') {
  return function (target: any, props: any) {
    console.warn(target, props, xyz)
  }
}
