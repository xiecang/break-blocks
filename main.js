var loadLevel = function (n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []

var enableDebugMode = function (enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k === 'p') {
            // log('按下了暂停')
            paused = !paused
        } else if ('1234567'.includes(k)) {
            // 载入关卡功能
            blocks = loadLevel(Number(k))
        }
    })

    // 使用滑条控制速度， input 可以动态监控值
    document.querySelector('#id-input-speed').addEventListener('input', function () {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}


var __main = function () {
    // debug 模式开启
    enableDebugMode(true)
    // 初始化分数
    var score = 0
    // GuaGame 载入,并初始化 fps
    var game = GuaGame(30)
    // paddle 载入
    var paddle = Paddle()
    // ball 载入
    var ball = Ball()
    // block 载入
    blocks = loadLevel(1)

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

    // 注册暂停事件
    var paused = false
    // // debug 模式开启
    // enableDebugMode(true)
    // 直接覆盖 update 函数
    game.update = function () {
        // 按了暂停
        if (paused) {
            return
        }

        // 球运动
        ball.move()
        // 球和挡板碰撞
        if (paddle.collide(ball)) {
            ball.fjtj()
        }
        // ball 和 block 块相撞
        // if (block.collide(ball)) {
        //     log('球和砖块相撞了')
        //     // 相撞了砖块 alive = false
        //     block.kill()
        //     // 反弹函数
        //     ball.fjtj()
        // }
        // ball 和 blocks 相撞了
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('球和砖块相撞了')
                // 相撞了砖块 alive = false
                block.kill()
                // 反弹函数
                ball.fjtj()
                // 更新分数
                score += 100
            }
        }
    }

    game.draw = function () {
        // 调用 GuaGame 的 drawImage 来draw 画图
        game.drawImage(paddle)
        game.drawImage(ball)

        // draw block
        // if (block.alive) {
        //     game.drawImage(block)
        // }

        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数: ' + score, 10, 290)

    }
}

__main()
