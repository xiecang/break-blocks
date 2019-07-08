var loadLevel = function (game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k === 'p') {
            log('按下了暂停')
            window.paused = !paused
        } else if ('1234567'.includes(k)) {
            // 载入关卡功能
            blocks = loadLevel(game, Number(k))
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
    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    // GuaGame 载入,并初始化 fps
    // 这里有个回调的问题需要加上function, 并将操作放在其中
    var game = GuaGame(30, images, function (game) {
        // 使用 scene 抽象了 update, draw
        // var scene = Scene(game)
        // game.update = function () {
        //     // 按了暂停
        //     if (window.paused) {
        //         return
        //     }
        //     scene.update()
        // }
        // game.draw = function () {
        //     scene.draw()
        // }
        // debug 模式开启,放在外边也可用
        // enableDebugMode(game, true)
        var s = Scene(game)
        game.runWithScene(s)
    })
    enableDebugMode(game, true)
}
__main()
