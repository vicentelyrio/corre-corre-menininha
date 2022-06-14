import Phaser from 'phaser'
import { addComponent, addEntity, IWorld } from 'bitecs'

import Position from '/components/Position'
import Velocity from '/components/Velocity'
import Sprite from '/components/Sprite'
import Rotation from '/components/Rotation'
import Player from '/components/Player'
import Input from '/components/Input'

export interface IGirl {
  entity: number;
  game: Phaser.Scene;
  sprites: string[];
  sprite: Phaser.GameObjects.Sprite;
  create: (world: IWorld) => void;
  preload: (load: Phaser.Loader.LoaderPlugin) => void;
}

enum Sprites {
  Walk,
  Dead
}

enum SpritesNames {
  Walk = 'walk',
  Dead = 'dead'
}

const spriteConfig = {
  frameWidth: 242,
  frameHeight: 227
}

export class Girl implements IGirl {
  public game!: Phaser.Scene
  public entity!: number
  public sprites!: string[]
  public sprite!: Phaser.GameObjects.Sprite

  constructor(game) {
    this.game = game
    this.sprites = Object.values(SpritesNames)
  }

  preload(load) {
    load.spritesheet(SpritesNames.Walk, '/assets/girl/walk.png', spriteConfig)
    load.spritesheet(SpritesNames.Dead, '/assets/girl/dead.png', spriteConfig)
  }

  create(world) {
    this.createEntity(world)
    this.createAnimations()
  }

  createEntity(world) {
    this.entity = addEntity(world)

    addComponent(world, Position, this.entity)
    addComponent(world, Velocity, this.entity)
    addComponent(world, Rotation, this.entity)
    addComponent(world, Sprite, this.entity)
    addComponent(world, Player, this.entity)
    addComponent(world, Input, this.entity)

    Position.x[this.entity] = 200
    Position.y[this.entity] = 200

    Sprite.texture[this.entity] = Sprites.Walk

    Input.speed[this.entity] = 10
  }

  createAnimations() {
    this.sprite = this.game.add.sprite(200, 200, 'ms')

    this.sprite.anims.create({
      key: 'idle',
      frames: this.sprite.anims.generateFrameNumbers(SpritesNames.Walk, { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1
    })

    this.sprite.play('idle')
    // this.sprite.animations.add('walk')
    // this.sprite.animations.play('walk', 50, true)
  }
}
