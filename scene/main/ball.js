class Ball extends GuaImage {
    constructor(game) {
        super(game, 'ball');
        this.setup()
    }

    setup() {
        let o = this

        this.speedX = config.ballSpeedX.value || BALL.speedX
        this.speedY = config.ballSpeedY.value || BALL.speedY

        o.fired = false
    }

    fire() {
        this.fired = true
    }

    move() {
        let o = this

        if (this.game.scene.debugModelEnable) {
            this.speedX = config.ballSpeedX.value * (this.speedX / Math.abs(this.speedX))
            this.speedY = config.ballSpeedY.value * (this.speedY / Math.abs(this.speedY))
        }

        // 发射状态
        if (o.fired) {
            // 撞到墙了，球要反弹
            if (o.x < 0 || o.x + o.w > CANVAS_WIDTH) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y + o.h > CANVAS_HEIGHT) {
                o.speedY = -o.speedY
            }
            // 球运动
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    fjtj() {
        // log('反弹了')
        this.speedY *= -1
    }
}
