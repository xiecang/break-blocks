let loadLevel = function (game, n) {
    n = n - 1
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block.new(game, p)
        blocks.push(b)
        game.scene.addElement(b)
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
            game.scene.blocks = game.scene.level.loadLevel(Number(k))
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

    // 从配置文件生成 HTML 控件
    insertControls()
    // 绑定事件
    bindEvents()
}

let bindAll = function (sel, eventName, callback) {
    let l = es(sel)
    for (let i = 0; i < l.length; i++) {
        let input = l[i]
        input.addEventListener(eventName, function (event) {
            callback(event)
        })
    }
}

let templateControl = function (key, item) {
    let t = `
                <div class="">
                    <label>
                        <input class="gua-auto-slider" type="range"
                            max="${item.max}"
                            min="${item.min}"
                            value="${item.value}"
                            data-value="config.${key}"
                        >
                     ${item._comment}: <span class="gua-label">${item.value}</span>
                    </label>
                </div>
            `
    return t
}

let insertControls = function () {
    let div = e('.gua-controls')
    log(div)
    let keys = Object.keys(config)
    for (let k of keys) {
        let item = config[k]
        let html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}

let bindEvents = function () {
    bindAll('.gua-auto-slider', 'input', function (event) {
        let target = event.target
        let bindlet = target.dataset.value
        let v = target.value
        eval(bindlet + '.value =' + v)
        log(v, bindlet)
        let label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

let __main = function () {
    let images = {
        bg: "img/background.jpg",
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        block0: 'img/block0.png',
        block1: 'img/block1.png',
        block2: 'img/block2.png',
        block3: 'img/block3.png',
        block4: 'img/block4.png',
        block5: 'img/block5.png',
        block6: 'img/block6.png',
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