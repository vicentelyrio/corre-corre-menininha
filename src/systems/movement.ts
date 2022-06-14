import { defineSystem, defineQuery } from 'bitecs'

import Position from '/components/Position'
import Velocity from '/components/Velocity'
import Rotation from '/components/Rotation'
import Input, { Direction } from '/components/Input'

export const getDirections = ({ speed }) => ({
  [Direction.None]: { x: 0, y: 0, angle: 0, },
  [Direction.Left]: { x: -speed, y: 0, angle: 180, },
  [Direction.Right]: { x: speed, y: 0, angle: 0, },
  [Direction.Up]: { x: 0, y: -speed, angle: 270, },
  [Direction.Down]: { x: 0, y: speed, angle: 90, },
})

export default function createMovementSystem() {
  const movementQuery = defineQuery([Position, Velocity, Input, Rotation])

  return defineSystem((world) => {
    const entities = movementQuery(world)

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i]

      const speed = Input.speed[id]
      const direction = Input.direction[id]
      const directions = getDirections({ speed })

      Velocity.x[id] = directions[direction].x
      Velocity.y[id] = directions[direction].y
      Rotation.angle[id] = directions[direction].angle
      
      Position.x[id] += Velocity.x[id]
      Position.y[id] += Velocity.y[id]
    }

    return world
  })
}
