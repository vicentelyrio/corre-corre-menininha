import Phaser from 'phaser'
import { defineSystem, defineQuery } from 'bitecs'

import Velocity from '../components/Velocity'
import Rotation from '../components/Rotation'
import Player from '../components/Player'
import Input, { Direction } from '../components/Input'

const getDirection = ({ left, right, up, down }) => {
  if (left.isDown) return Direction.Left
  if (right.isDown) return Direction.Right
  if (up.isDown) return Direction.Up
  if (down.isDown) return Direction.Down

  return Direction.None
}

export default function createPlayerSystem(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
  const playerQuery = defineQuery([Player, Velocity, Rotation, Input])

  return defineSystem((world) => {
    const entities = playerQuery(world)

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i]
      Input.direction[id] = getDirection(cursors)
    }

    return world
  })
}
