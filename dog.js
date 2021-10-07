class Dog extends Entity {
  constructor(settings) {
    super(settings)
    this.mass = random(30,60)
    this.rotation = random(360)
    this.turnSpeed = random(-1,1)
    this.leashLength = random(40,80)
  }
  update() {
    if(!this.location) this.location = this.randomLocation
    super.update()
    this.move()
  }
  move() {
    let offset = createVector()
    offset.x = cos(this.rotation)*this.mass/100
    offset.y = sin(this.rotation)*this.mass/100
    this.walker.location.add(offset)
    this.location.add(offset) 
    this.rotation += this.turnSpeed
  }
  draw() {
    push()
    translate(this.location.x, this.location.y)
    rotate(this.rotation)
    rect(0,0,sqrt(this.mass)*3,sqrt(this.mass)*1.5)
    pop()
    line(this.location.x, this.location.y, this.walker.location.x, this.walker.location.y)
    push()
    fill(0)
    textSize(8)
    textAlign(CENTER)
    text("MASS: " + round(this.mass), this.location.x, this.location.y - 10)
    pop()
  }
  get location() {
    
    let offset = createVector()
    offset.x = cos(this.rotation)*this.leashLength
    offset.y = sin(this.rotation)*this.leashLength
    let newLoc = this.walker.location.copy().add(offset)
    return newLoc
  }
}