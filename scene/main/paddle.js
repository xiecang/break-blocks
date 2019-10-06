class Paddle extends GuaImage {
    constructor(game) {
        super(game, 'paddle');
        this.setup()
    }
    setup() {
        this.speed = 15
    }

    move(x) {
        let o = this

        if (x < 0) {
            x = 0
        }
        if (x > CANVAS_WIDTH - o.w) {
            x = CANVAS_WIDTH - o.w
        }
        o.x = x
    }
    moveLeft(x) {
        let o = this

        o.move(o.x - o.speed)
    }
    moveRight(x) {
        let o = this

        o.move(o.x + o.speed)
    }
    collide(ball) {
        // ball 是 Ball 对象实例
        let a = this
        let b = ball
        return rectIntersects(a, b)
    }
}
