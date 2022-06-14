import { addComponent, addEntity } from 'bitecs'

import Position from '/components/Position'
import Velocity from '/components/Velocity'
import Sprite from '/components/Sprite'
import Rotation from '/components/Rotation'
import Player from '/components/Player'
import Input from '/components/Input'

enum Sprites {
  Walk,
  Dead
}

const preload = (load) => {
  load.spritesheet('tank-red', '/assets/tank_red.png')
}

const create = (world) => {
  const girl = addEntity(world)

  addComponent(world, Position, girl)
  addComponent(world, Velocity, girl)
  addComponent(world, Rotation, girl)
  addComponent(world, Sprite, girl)
  addComponent(world, Player, girl)
  addComponent(world, Input, girl)

  Position.x[girl] = 100
  Position.y[girl] = 100
  // Sprite.texture[girl] = Textures.TankBlue

  Input.speed[girl] = 10
}

export const Girl = () => ({
  create,
  preload
})
