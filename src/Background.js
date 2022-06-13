import { LAYER_BG_STATIC, SPEED } from './Config'
import { Movable } from './Movable'

const ASSETS = [
  {
    name: 'sky',
    layerName: LAYER_BG_STATIC,
    parallax: 0,
  },
  {
    name: 'rocks',
    layerName: LAYER_BG_STATIC,
    parallax: 0,
  },
  {
    name: 'clouds_1',
    layerName: LAYER_BG_STATIC,
    parallax: 0,
  },
  {
    name: 'clouds_2',
    layerName: LAYER_BG_STATIC,
    parallax: 0,
  },
  {
    name: 'ground_1',
    layerName: LAYER_BG_STATIC,
    parallax: SPEED / 5,
  },
  {
    name: 'ground_2',
    layerName: LAYER_BG_STATIC,
    parallax: SPEED / 3,
  },
  {
    name: 'ground_3',
    layerName: LAYER_BG_STATIC,
    parallax: SPEED,
  },
]

export class Background extends Movable {
  constructor(game, { direction = 1 } = {}) {
    super(game)
    this.game = game
    this.direction = direction

    const { add, loadSprite, layer, pos, width, height, sprite, onUpdate, origin } = game

    ASSETS.forEach(({ name, layerName, parallax }) => {
      loadSprite(name, `${name}.png`)
      add([sprite(name), layer(layerName), origin('botleft'), pos(0, height()), name])

      if (parallax) {
        add([sprite(name), layer(layerName), origin('botleft'), pos(width(), height()), name])
        onUpdate(name, (obj) => this.moveBy(obj, parallax))
      }
    })
  }
}
