import {
  DEBUG,
  FULLSCREEN,
  LAYERS,
  // LAYERS_IGNORED,
  LAYER_GAME,
  ASSETS_ROOT
} from './Config'

import kaboom from 'kaboom'

import { Girl } from './Girl'
import { Background } from './Background'
import { Boundaries } from './Boundaries'
import { Interface } from './Interface'
import { Jumpables } from './Jumpables'

import './style.css'

export class Game {
  constructor() {
    this.build()
  }

  build() {
    const game = kaboom({
      scale: 1,
      fullscreen: FULLSCREEN,
      debug: DEBUG,
      global: false,
    })

    console.log()
    this.game = game
    this.game.layers(LAYERS, LAYER_GAME)
    this.game.loadRoot(ASSETS_ROOT)
    // this.game.camIgnore(LAYERS_IGNORED)

    this.girl = new Girl(this.game)
    this.background = new Background(this.game)
    this.boundaries = new Boundaries(this.game)
    this.jumpables = new Jumpables(this.game)
    this.interface = new Interface(this.game)

    // Girl Controls
    this.game.onKeyPress('left', () => {
      this.girl.backward()
    })

    this.game.onKeyPress('right', () => {
      this.girl.forward()
    })

    this.game.onKeyPress('space', () => {
      this.girl.jump()
    })

    this.game.onKeyPress('enter', () => {
      this.girl.damage()
    })

    this.game.onUpdate(() => {
      const { girl, girl: { entity }, game: { keyIsDown } } = this

      if (entity.isGrounded() && girl.alive && !keyIsDown('left') && !keyIsDown('right') && !keyIsDown('space')) {
        girl.idle()
      }

      this.interface.setLife(girl.health)
    })
  }
}

const game = new Game()

if (DEBUG) {
  window.game = game
}
