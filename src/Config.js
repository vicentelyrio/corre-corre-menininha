// APP
export const DEBUG = true
export const FULLSCREEN = true

// LAYERS
export const LAYER_BG_STATIC = 'BGSTATIC'
export const LAYER_BG_DYNAMIC = 'BGDYNAMIC'
export const LAYER_GAME = 'GAME'
export const LAYER_UI = 'UI'

export const LAYERS = [LAYER_BG_STATIC, LAYER_BG_DYNAMIC, LAYER_GAME, LAYER_UI]
export const LAYERS_IGNORED = [LAYER_BG_STATIC, LAYER_UI]

// ASSETS
export const ASSETS_ROOT = '/assets/'

// FISICS
export const SPEED = 100
export const JUMP_FORCE = 400
export const MOVE_SPEED = 240
export const FALL_DEATH = 640

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
