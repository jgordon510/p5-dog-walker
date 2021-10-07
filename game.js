class Game {
  constructor(settings) {
    Object.assign(this, settings)
    this.entities = []
    //all entities must be given the game
    //color/width/height default to chartreuse/20/20
    this.walker = new Walker({ color: 'red', game: this })
    rectMode(CENTER)
    imageMode(CENTER)
    angleMode(DEGREES)
  }
  async mainLoop(runOnce) {
    // if (!runOnce) await this.stateChange('title')
    this.initGame()
    await this.stateChange('game')
    await this.stateChange('end')
    this.mainLoop(true)
  }
  stateChange(state) {
    return new Promise((resolve) => {
      this.keyCleared = false
      this.state = state
      this.stateResolve = resolve
      console.log("NEW STATE: ", this.state)
    })
  }
  update() {
    this[this.state + 'State']()
  }
  initGame() {
    this.walker.location = createVector(width / 2, height / 2)
    this.walker.speed = 0
    this.walker.turnSpeed = 0
  }
  gameState() {
    this.draw()
    //this is an example game that ends when you press space
    if (keyIsDown(32) && this.keyCleared) this.stateResolve()
    else if (!keyIsDown(32)) this.keyCleared = true
    //use this to display score, etc. during game
    this.info()
  }
  draw() {
    background('gray')
    this.entities.forEach((entity) => {
      entity.update()
    })
  }
  info() {
    fill("white")
    text("SPACE TO END GAME", 10, 20)
  }
  titleState() {
    push()
    background(0)
    textAlign(CENTER)
    textSize(20)
    fill(255)
    text("Title", width / 2, height * 0.4)
    text("-space to start-", width / 2, height * 0.6)
    pop()
    if (keyIsDown(32) && this.keyCleared) this.stateResolve()
    else if (!keyIsDown(32)) this.keyCleared = true
  }
  endState() {
    push()
    background(0)
    textAlign(CENTER)
    textSize(20)
    fill(255)
    text("GAME OVER", width / 2, height * 0.4)
    text("-space to replay-", width / 2, height * 0.8)
    pop()
    if (keyIsDown(32) && this.keyCleared) this.stateResolve()
    else if (!keyIsDown(32)) this.keyCleared = true
  }
}