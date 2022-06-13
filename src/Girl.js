// import { createMachine, interpret } from 'xstate'
import { JUMP_FORCE, MOVE_SPEED, clamp } from './Config'

const GIRL_SIZE = 227
const GIRL_HEALTH = 4

// DIRECTION STATE
const DIRECTION = {
  forward: 1,
  backward: -1,
  idle: 0,
}

// ALIVE ASSETS
const ASSET_GIRL = 'ASSET_GIRL'
const ASSET_GIRL_URL = 'girl.png'
const ASSET_GIRL_SLICES = 21

// ALIVE ANIMATION NAMES
const IDLE = 'idle'
const JUMP = 'jump'
const WALK = 'walk'

// ALIVE ANIMATION FRAMES
const ANIM_IDLE = { from: 0, to: 5 }
const ANIM_JUMP = { from: 6, to: 13 }
const ANIM_WALK = { from: 14, to: 20 }

// ALIVE ANIMATION
const ANIMATIONS_ALIVE = {
  [IDLE]: ANIM_IDLE,
  [JUMP]: ANIM_JUMP,
  [WALK]: ANIM_WALK,
}

// DEAD ASSETS
const ASSET_DEAD = 'ASSET_DEAD'
const ASSET_DEAD_URL = 'girl_dead.png'
const ASSET_DEAD_SLICES = 10

// DEAD ANIMATION FRAMES
const ANIM_DYING = { from: 0, to: 9 }
const ANIM_DEAD = { from: 9, to: 9 }

const DEAD = 'dead'
const DYING = 'dying'

// DEAD ANIMATION
const ANIMATIONS_DEAD = {
  [DYING]: ANIM_DYING,
  [DEAD]: ANIM_DEAD,
}

export class Girl {
  constructor(game) {
    this.game = game
    this.direction = DIRECTION.idle
    this.health = GIRL_HEALTH
    this.jumping = false
    this.moving = false

    this.#buildEntity()
    this.#buildListeners()
  }

  get alive() {
    return this.health > 0
  }

  #buildEntity() {
    const { add, loadSprite, width, height, sprite, pos, scale, body, area } = this.game

    loadSprite(ASSET_GIRL, ASSET_GIRL_URL, {
      sliceX: ASSET_GIRL_SLICES,
      anims: ANIMATIONS_ALIVE,
    })

    loadSprite(ASSET_DEAD, ASSET_DEAD_URL, {
      sliceX: ASSET_DEAD_SLICES,
      anims: ANIMATIONS_DEAD,
    })

    this.entity = add([
      sprite(ASSET_GIRL),
      pos((width() - GIRL_SIZE) / 2, -height()),
      scale(1),
      // area(vec2(6), vec2(24)),
      area(),
      body(),
    ])
  }

  #buildListeners() {
    this.entity.onUpdate(() => {
      this.entity.pushOutAll()
      this.entity.move(MOVE_SPEED * this.direction, 0)
    })

    this.entity.on('animEnd', (anim) => {
      if (anim === DYING) this.entity.play(DEAD)
      if (anim === JUMP) {
        this.jumping = false
        this.direction === DIRECTION.idle
          ? this.entity.play(IDLE)
          : this.entity.play(WALK)
      }
    })
  }

  #setHealth(health) {
    this.health = clamp(health, 0, GIRL_HEALTH)

    this.health <= 0 ? this.#dead() : this.#alive()
  }

  #dead() {
    if (this.entity.curAnim() === DEAD) return

    this.direction = DIRECTION.idle
    this.entity.changeSprite(ASSET_DEAD)
    this.entity.play(DYING, false)
  }

  #alive() {
    this.entity.changeSprite(ASSET_GIRL)
    this.entity.play(IDLE)
  }

  #walk() {
    if (!this.jumping) this.entity.play(WALK)
  }

  forward() {
    this.direction = DIRECTION.forward
    this.#walk()
  }

  backward() {
    this.direction = DIRECTION.backward
    this.#walk()
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true
      this.entity.play(JUMP, 0)
      this.entity.jump(JUMP_FORCE)
    }
  }

  idle() {
    this.entity.play(IDLE)
    this.direction = DIRECTION.idle
  }

  damage() {
    this.#setHealth(this.health - 1)
  }

  heal() {
    this.#setHealth(this.health + 1)
  }
}

// const machine = createMachine(
//   {
//     id: 'machine',
//     initial: 'idle',
//     context: {
//       direction: 0
//     },
//     states: {
//       idle: {
//         on: {
//           forward: {
//             target: 'forward',
//             actions: ['forward']
//           },
//           backward: {
//             target: 'backward',
//             actions: ['backward']
//           },
//           jump: {
//             target: 'jump',
//             actions: ['jump']
//           }
//         }
//       },
//       forward: {
//         on: {
//           idle: {
//             target: 'idle',
//             actions: ['idle']
//           },
//           backward: {
//             target: 'backward',
//             actions: ['backward']
//           },
//           jump: {
//             target: 'backward',
//             actions: ['jump']
//           }
//         }
//       },
//       backward: {
//         on: {
//           forward: {
//             target: 'forward',
//             actions: ['forward']
//           },
//           idle: {
//             target: 'idle',
//             actions: ['idle']
//           },
//           jump: {
//             target: 'jump',
//             actions: ['jump']
//           }
//         }
//       },
//       jump: {
//         on: {
//           forward: {
//             target: 'forward',
//             actions: ['forward']
//           },
//           backward: {
//             target: 'backward',
//             actions: ['backward']
//           },
//           idle: {
//             target: 'idle',
//             actions: ['idle']
//           }
//         }
//       },
//     }
//   },
//   {
//     actions: {
//       jump: () => this.girl.jump(),
//       forward: () => this.girl.forward(),
//       backward: () => this.girl.backward(),
//       idle: () => this.girl.idle(),
//     }
//   }
// )

// const service = interpret(machine)

// service.start()

// this.game.keyPress('left', () => {
//   service.send('backward')
// })

// this.game.keyPress('right', () => {
//   service.send('forward')
// })

// this.game.keyPress('space', () => {
//   service.send('jump')
// })

// this.game.keyPress('enter', () => {
//   this.girl.damage()
// })

// this.game.action(() => {
//   const { girl, girl: { entity }, game: { keyIsDown } } = this

//   if (entity.grounded() && girl.alive && !keyIsDown('left') && !keyIsDown('right') && !keyIsDown('space')) {
//     service.send('idle')
//   }

//   this.interface.setLife(girl.health)
// })
