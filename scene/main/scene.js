class Scene extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInput()

    }
    setup() {
        let game = this.game
        let s = this

        // 初始化
        this.score = 0

        // 关卡载入
        this.level = Level.new(this.game)

        this.bg = GuaImage.new(this.game, 'bg')
        // paddle 载入
        this.paddle = Paddle.new(game)
        this.paddle.x = 100
        this.paddle.y = 450

        // ball 载入
        this.ball = Ball.new(game)
        this.ball.x = 100
        this.ball.y = 200

        this.addElement(this.bg)
        this.addElement(this.paddle)
        this.addElement(this.ball)

        this.blocks = s.blocks || this.level.loadLevel(1)
        this.addBlocks()

        // 编辑关卡
        s.enableEditLevel = false


    }
    setupInput() {
        let game = this.game
        let paddle = this.paddle
        let ball = this.ball

        // events 按键事件
        game.registerAction('a', function () {
            paddle.moveLeft()
        })
        game.registerAction('d', function () {
            paddle.moveRight()
        })
        game.registerAction('f', function () {
            ball.fire()
        })
    }


    draw() {
        super.draw();
        let game = this.game

        // draw labels
        game.context.fillStyle = "pink"
        game.context.fillText('分数: ' + this.score, 10, 490)
    }

    update() {
        super.update();
        let game = this.game
        let paddle = this.paddle
        let ball = this.ball
        let s = this.game.scene

        // 暂停功能
        if (window.paused) {
            return
        }
        // 球运动
        ball.move()
        // 判断游戏结束，跳转到结束画面
        if (ball.y > paddle.y) {
            // let end = SceneEnd.new(game)
            // game.replaceScene(end)
        }
        // ball 和 paddle 碰撞
        if (paddle.collide(ball)) {
            // ball 的反弹函数
            ball.fjtj()
        }
        // ball 和 blocks 相撞了
        for (let i = 0; i < s.blocks.length; i++) {
            let block = s.blocks[i]
            if (block.collide(ball)) {
                log('球和砖块相撞了')
                // 相撞了砖块 alive = false
                block.kill()
                // 反弹函数
                ball.fjtj()
                // 更新分数
                this.score += 100
            }
        }
        let enableDrag = false
        game.canvas.addEventListener('mousedown', function (event) {
            let x = event.offsetX
            let y = event.offsetY
            log(x, y, 'down')
            // 检查是否点中了 ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            } else {
                if (!s.enableEditLevel) {
                    return
                }
                // 添加砖块
                let b = Block(game, [x, y, (Math.random() * (3 - 3) + 1)])
                s.blocks.push(b)
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            let x = event.offsetX
            let y = event.offsetY
            log(x, y, 'up')
            enableDrag = false
        })
    }

    addBlocks() {
        for (let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i]
            if (block.alive) {
                this.addElement(block)
            }
        }
    }

    deleteBlock(block) {
        log("deleteBlock before", this.blocks, this.elements)

        let index = this.blocks.indexOf(block)
        this.blocks.splice(index, 1)
        this.deleteElement(block)
        log("deleteBlock after", this.blocks, this.elements)
    }

}
