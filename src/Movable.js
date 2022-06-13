export class Movable {
  moveBy(obj, speed) {
    const { width } = this.game
    obj?.move(-speed * this.direction, 0)

    const { x } = obj?.pos || {}

    if (x <= -width()) {
      Object.assign(obj?.pos, { x: x + width() * 2 })
    }
  }
}
