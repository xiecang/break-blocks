class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        // draw lables
        this.game.context.fillText('按 k 开始游戏', 100, 100)
        this.game.context.fillText('按 f 发射子弹', 100, 150)
        this.game.context.fillText('按 e 编辑/退出编辑关卡,鼠标左键添加砖块', 100, 200)
    }
}
