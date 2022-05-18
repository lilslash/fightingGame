class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src =imageSrc
    }
    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }

}

class Fighter {
    constructor({ position, velocity, color = "red", offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.hurtBoxColor = color
        this.isAttacking
        this.health = 100
    }
    draw() {
        c.fillStyle = this.hurtBoxColor
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.isAttacking) {
            c.fillStyle = 'yellow'
            c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        }
    }
    update() {
        this.draw()
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 200);
    }

}