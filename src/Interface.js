import { LAYER_UI, clamp } from './Config'

const ASSET_LIFE = 'ASSET_LIFE'
const ASSET_LIFE_URL = 'life.png'

const H1 = 'h1'
const H2 = 'h2'
const H3 = 'h3'
const H4 = 'h4'
const H5 = 'h5'

const ASSET_LIFE_SLICES = 5
const ANIMATIONS_LIFE_NAMES = [
  H1, H2, H3, H4, H5
]

const ANIM_H5 = { from: 0, to: 0 }
const ANIM_H4 = { from: 1, to: 1 }
const ANIM_H3 = { from: 2, to: 2 }
const ANIM_H2 = { from: 3, to: 3 }
const ANIM_H1 = { from: 4, to: 4 }

const ANIMATIONS_LIFE = {
  [H1]: ANIM_H1,
  [H2]: ANIM_H2,
  [H3]: ANIM_H3,
  [H4]: ANIM_H4,
  [H5]: ANIM_H5,
}

export class Interface {
  constructor(game) {
    this.game = game

    this.build()
  }

  build() {
    const { add, loadSprite, sprite, pos, scale, layer } = this.game

    loadSprite(ASSET_LIFE, ASSET_LIFE_URL, {
      sliceX: ASSET_LIFE_SLICES,
      anims: ANIMATIONS_LIFE,
    })

    this.life = add([
      sprite(ASSET_LIFE),
      pos(20, 20),
      scale(1),
      layer(LAYER_UI),
    ])
  }

  setLife(amount) {
    const lifeAmount = clamp(amount, 0, 4)
    this.life.play(ANIMATIONS_LIFE_NAMES[lifeAmount])
  }
}
