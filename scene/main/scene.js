let Scene = function (game) {
    let s = {
        game: game,

    }
    // 初始化
    let score = 0
    // paddle 载入
    let paddle = Paddle(game)
    // ball 载入
    let ball = Ball(game)
    // block 载入
    s.blocks = s.blocks || loadLevel(game, 1)
    // 编辑关卡
    s.enableEditLevel = false

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
    s.draw = function () {
        // 添加背景
        game.context.fillStyle = '#555'
        game.context.fillRect(0, 0, 400, 300)
        // 调用 GuaGame 的 drawImage 来 draw 画图
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw block
        // if (block.alive) {
        //     game.drawImage(block)
        // }

        // draw blocks
        for (let i = 0; i < s.blocks.length; i++) {
            let block = s.blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillStyle = "pink"
        game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = function () {
        // 暂停功能
        if (window.paused) {
            return
        }
        // 球运动
        ball.move()
        // 判断游戏结束，跳转到结束画面
        if (ball.y > paddle.y) {
            let end = SceneEnd.new(game)
            game.replaceScene(end)
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
                score += 100
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
    return s
}
