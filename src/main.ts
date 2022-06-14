import Phaser from 'phaser'

import Game from '/scenes/Game'

import '/styles.css'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [Game]
}

export default new Phaser.Game(config)
