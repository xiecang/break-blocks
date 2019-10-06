class Block extends GuaImage {
    constructor(game, position) {
        super(game, 'block');
        // position 是 [0, 0] 格式
        let p = position
        this.x = p[0]
        this.y = p[1]
        this.alive = true

        this.lives = p[2] || 1  // 生命
    }

    kill() {
        let o = this
        o.lives--
        if (o.lives < 1) {
            o.alive = false
        }
        this.scene.deleteBlock(this)
    }

    collide = function (ball) {
        let b = ball
        let o = this
        // 判断相撞，要有两次 o in b， b in o，并且砖块 alive = true
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
}
