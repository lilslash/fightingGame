const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.3

const background = new Sprite ({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './imgs/background.png'
})

const shop = new Sprite ({
    position:{
        x: 600,
        y: 128
    },
    imageSrc: './imgs/shop.png',
    scale: 2.75,
    framesMax: 6,
    
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 215,
        y: 157
    },
    sprites:{
        idle:{
            imageSrc: './imgs/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run:{
            imageSrc: './imgs/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump:{
            imageSrc: './imgs/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall:{
            imageSrc: './imgs/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1:{
            imageSrc: './imgs/samuraiMack/Attack1.png',
            framesMax: 6,
        }
    },
    imageSrc: './imgs/samuraiMack/Idle.png',
    framesMax: 8,
    scale:2.5
    
})



const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: -50,
        y: 0
    },
    color: "blue"
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
}


decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    // enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    /// player movement
    
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -1
       player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 1
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }
    
    if(player.velocity.y < 0){
       player.switchSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

    /// enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 1
    }

    /// detect for collision
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector("#enemyHealth").style.width = enemy.health + '%'
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector("#playerHealth").style.width = player.health + '%'
    }

    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()


window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})



// const fullscreenBtn = document.querySelector('.fullscreen')

// fullscreenBtn.addEventListener('click', openFullscreen)

// function openFullscreen() {
//     if (canvas.requestFullscreen) {
//         canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) { /* Safari */
//         canvas.webkitRequestFullscreen();
//     } else if (canvas.msRequestFullscreen) { /* IE11 */
//         canvas.msRequestFullscreen();
//     }
// }    