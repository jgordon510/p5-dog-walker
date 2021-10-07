class Walker extends Entity {
  constructor(settings) {
    super(settings)
    this.rotation = 0
    this.dogs = []
    this.location = createVector(width / 2, height / 2)
    this.dogs[0] = new Dog({walker:this, game:this.game})
    this.dogs[1] = new Dog({walker:this, game:this.game})
  }
  update() {
    super.update()
    this.keyCheck()
    this.wrap()
    this.speed *=0.8
    this.turnSpeed *= 0.8
    this.rotation += this.turnSpeed
    this.location.x += cos(this.rotation)*this.speed
    this.location.y += sin(this.rotation)*this.speed
    this.move()
  }
  move() {
    this.dogs.forEach((dog)=>{
      let offset = createVector()
      offset.x = cos(this.rotation)*this.speed
      offset.y = sin(this.rotation)*this.speed
      let massFactor = 1/(100/dog.mass)
      this.location.add(offset.mult(massFactor))
      dog.location.add(offset.mult(massFactor) )
    })
    
  }
  draw() {
    push()
    translate(this.location.x, this.location.y)
    rotate(this.rotation)
    rect(0,0,20)
    rect(10,0,3)
    pop()
  }
  keyCheck() {
    let acc = 0.1
    if (keyIsDown(38)) this.speed += acc
    if (keyIsDown(40)) this.speed -= acc
    if (keyIsDown(37)) this.turnSpeed -= 1
    if (keyIsDown(39)) this.turnSpeed += 1
  }
  wrap() {
    if (this.location.y > height) this.location.y = 0
    if (this.location.y < 0) this.location.y = height
    if (this.location.x > width) this.location.x = 0
    if (this.location.x < 0) this.location.x = width
  }
}