class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
    }

    setup() {
        this.enableSelect = true
        this.startRect = Rect.new(200, 100, 200, 80, "green")
        this.editRect = Rect.new(200, 200, 200, 80, "green")
        this.helpRect = Rect.new(200, 300, 200, 80, "green")
    }

    draw() {

        // this.drawRect(200, 100, 200, 80, "green")
        let context = this.game.context
        this.startRect.draw(context)
        this.drawLabel("开始游戏", 240, 150, "black", 30)

        this.editRect.draw(context)
        this.drawLabel("编辑关卡", 240, 250, "black", 30)

        this.helpRect.draw(context)
        this.drawLabel("游戏帮助", 240, 350, "black", 30)
    }

    update() {
        let self = this
        this.game.canvas.addEventListener('mousedown', function (event) {
            if (self.enableSelect) {
                let x = event.offsetX
                let y = event.offsetY

                if (self.startRect.hasPoint(x, y)) {
                    log('in startRect')
                    let s = Scene.new(self.game)
                    self.game.replaceScene(s)
                    self.enableSelect = false
                } else if (self.editRect.hasPoint(x, y)) {
                    log('in editRect')
                    self.enableSelect = false

                } else if (self.helpRect.hasPoint(x, y)) {
                    log('in helpRect')
                    self.enableSelect = false
                }
            }
        })
    }
}
