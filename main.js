let loadLevel = function (game, n) {
    n = n - 1
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}


let enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        let k = event.key
        if (k === 'p') {
            log('按下了暂停')
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 载入关卡功能
            game.scene.blocks = loadLevel(game, Number(k))
        } else if (k === 'e') {
            game.scene.enableEditLevel = !game.scene.enableEditLevel
        }
    })
    // 使用滑条控制速度， input 可以动态监控值
    document.querySelector('#id-input-speed').addEventListener('input', function () {
        let input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
let __main = function () {
    let images = {
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        block: 'img/block.png',
    }
    // GuaGame 载入,并初始化 fps, images
    // 这里有个回调的问题需要加上function, 并将操作放在其中
    let game = GuaGame.instance(30, images, function (g) {
        let s = SceneTitle.new(game)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}
__main()
