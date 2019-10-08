class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function () {
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })

        this.setup()
    }

    setup() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.addElement(this.bg)
    }


    draw() {
        super.draw()

        // draw labels
        let score = Level.loadLatestScore()
        this.drawLabel('游戏结束，您的最终得分为：', 160, 180, 'green', 20)
        this.drawLabel(score, 260, 220, 'red', 30)
        this.drawLabel('按 r 再来一次', 220, 250, 'green', 20)
    }

}
