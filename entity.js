class Entity {
  constructor(settings) {
    settings.color = settings.color || 'chartreuse'
    settings.width = settings.width || 20
    settings.height = settings.height || 20
    Object.assign(this, settings)
    this.game.entities.push(this)
  }
  update() {
    this.draw()
  }
  draw() {
    push()
    fill(this.color)
    noStroke()
    rectMode(CENTER)
    rect(this.location.x, this.location.y, this.width, this.height)
    pop()
  }
}