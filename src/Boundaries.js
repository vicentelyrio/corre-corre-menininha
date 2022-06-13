import { DEBUG, SPEED } from './Config'
import { Movable } from './Movable'

export class Boundaries extends Movable {
  constructor(game) {
    super(game)
    this.game = game
    this.direction = 1
    this.color = DEBUG ? .1 : 0

    this.build()
  }

  build() {
    this.buildFloor()
    // this.buildLeftWall()
    // this.buildRightWall()
  }

  buildFloor() {
    const { width, height, onUpdate, add, rect, pos, area, solid, color } = this.game

    // drawRect({
    //   width: width(),
    //   height: 20,
    //   pos: vec2(0, height() - 40),
    //   solid: true,
    //   color: [255, 0, 0, this.color],
    //   tags: ['floor']
    // })

    // drawRect({
    //   width: width(),
    //   height: 20,
    //   pos: vec2(width(), height() - 40),
    //   solid: true,
    //   color: [255, 0, 0, this.color],
    //   tags: ['floor']
    // })

    add([
      rect(width(), 20),
      pos(0, height() - 40),
      area(),
      solid(),
      color(255, 0, 0, this.color),
      'floor'
    ])

    add([
      rect(width(), 20),
      pos(width(), height() - 40),
      area(),
      solid(),
      color(255, 0, 0, this.color),
      'floor'
    ])

    onUpdate('floor', (obj) => {
      this.moveBy(obj, SPEED)
    })
  }

  // buildLeftWall() {
  //   const { drawRect, vec2, height } = this.game

  //   drawRect({
  //     width: 20, 
  //     height: height(),
  //     pos: vec2(21, 0),
  //     solid: true,
  //     color: [255, 0, 0, this.color]
  //   })
  // }

  // buildRightWall() {
  //   const { drawRect, width, vec2, height } = this.game

  //   drawRect({
  //     width: 20,
  //     height: height(),
  //     pos: vec2(width() - 20, 0),
  //     solid: true,
  //     color: [255, 0, 0, this.color],
  //   })
  // }
}
