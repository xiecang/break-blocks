class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        // images 是一个对象，里边是图片的名字
        // 程序会在所有图片载入成功后运行
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        // 储存 key 和 function
        this.actions = {}
        // 储存按键的状态
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        // 这里有一个 this 的陷阱，可以使用 self 和 箭头函数来避免
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function () {
            self.keydowns[event.key] = false
        })
        this.init()
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }

    // 这里如果不使用箭头函数就要在前面 bind
    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop() {
        log(window.fps)
        var g = this
        // events
        var actions = Object.keys(g.actions)  // 获取到所有的 actions
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键按下，调用注册的 action 的 callback
                g.actions[key]()
            }
        }
        // update 更新
        g.scene.update()
        // clear 清除画板
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw 画图
        g.scene.draw()
        // next run loop
        // 递归调用
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start(scene) {
        // 第一次运行需要加上 runCallback
        this.runCallback(this)
        // 开始运行程序
        // setTimeout(function () {
        //     runloop()
        // }, 1000 / fps)
        // return g
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                // 存入 g.image 中
                g.images[name] = img
                // 所有图片载入后执行，调用 run
                loads.push(1)
                // log('载入图片', loads.length, names.length)
                if (loads.length === names.length) {
                    // g.run()
                    g.__start()
                }
            }
        }
    }
}
