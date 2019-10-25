class Block extends GuaImage {
    constructor(game, position) {
        // position 是 [0, 0] 格式
        let p = position
        let lives = p[2] || 1  // 生命

        let name = 'block' + (lives - 1)
        super(game, name);

        this.x = p[0]
        this.y = p[1]
        this.alive = true
        this.lives = lives
    }

    kill() {
        let o = this
        o.lives--
        if (o.lives < 1) {
            o.alive = false
            this.game.scene.deleteBlock(this)
        }
    }

    collide(ball) {
        let b = ball
        let o = this
        // 判断相撞，要有两次 o in b， b in o，并且砖块 alive = true
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
}
