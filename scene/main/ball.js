class Ball extends GuaImage {
    constructor(game) {
        super(game, 'ball');
        this.setup()
    }

    setup() {
        let o = this

        o.speedX = 5
        o.speedY = 5
        o.fired = false
    }

    fire() {
        this.fired = true
    }

    move() {
        let o = this

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
