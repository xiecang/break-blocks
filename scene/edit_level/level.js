class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)

    }

    drawGrid() {

    }

    draw() {
        super.draw()
        this.drawGrid('#ccc', 50, 20)
    }

}
