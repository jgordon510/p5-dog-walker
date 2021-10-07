let game, images = {}
function preload() {
  //images.mover = loadImage("filename.png")
}

function setup() {
  createCanvas(500, 500).parent("game")
  game = new Game({ state: 'game' })
  draw = game.update.bind(game)
  game.mainLoop()
}