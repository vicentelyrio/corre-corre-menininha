export class Jumpables {
  constructor(game) {
    this.game = game
    this.direction = 1

    this.build()
  }

  build() {
    const {
      add,
      loadSprite,
      sprite,
      width,
      pos,
      solid,
      body,
      scale,
      loop,
      area,
    } = this.game

    const name = 'log_2'

    loadSprite('log_1', 'log_1.png')
    loadSprite('log_2', 'log_2.png')
    // loadSprite(name, `${name}.png`)

    // add([
    //   sprite(name),
    //   pos(width(), 0),
    //   solid(),
    //   body(),
    //   scale(.05),
    //   name
    // ])

    loop(2, () => {
      // const obj = choose([
      //   "log_1",
      //   "log_2",
      // ]);
      // add([
      //   sprite(obj),
      //   "obj",
      //   obj,
      //   scale(.05),
      //   pos(rand(width() / 2, width()), 0),
      // ])

      loadSprite(name, `${name}.png`)

      add([
        sprite(name),
        pos(width(), 0),
        area(),
        solid(),
        body(),
        scale(0.1),
        name
      ])

      // action(name, (el) => this.moveBy(el, 20))
    })
  }

  moveBy(obj, speed) {
    obj.move(-speed * this.direction, 0)
  }
}
