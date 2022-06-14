import Phaser from 'phaser'
import { defineSystem, defineQuery } from 'bitecs'

import CPU from '/components/CPU'
import Velocity from '/components/Velocity'
import Rotation from '/components/Rotation'
import Input, { Direction } from '/components/Input'

export const directions = [
  Direction.Left,
  Direction.Right,
  Direction.Up,
  Direction.Down,
]

export default function createCPUSystem(scene: Phaser.Scene) {
  const cpuQuery = defineQuery([CPU, Velocity, Rotation, Input])

  return defineSystem((world) => {
    const entities = cpuQuery(world)
    const dt = scene.game.loop.delta

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i]

      CPU.accumulatedTime[id] += dt

      if (CPU.accumulatedTime[id] < CPU.timeBetweenActions[id]) {
        continue
      }

      CPU.accumulatedTime[id] = 0

      const threshold = Phaser.Math.Between(1, 20)
      const direction = directions[threshold] ?? Direction.None
      Input.direction[id] = direction
    }

    return world
  })
}
