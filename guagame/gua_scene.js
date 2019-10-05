class GuaScene {
    constructor(game) {
        this.game = game
    }

    // 将子类中的共同方法提取到父类中
    static new(game) {
        let i = new this(game)
        return i
    }


    drawRect(x, y, w, h, color) {
        let self = this
        let context = this.game.context

        context.fillStyle = color
        context.fillRect(x, y, w, h)
    }

    drawLabel(text, x, y, color, fontSize) {
        let context = this.game.context

        // log('drawLabel', x, y)
        context.font = fontSize + "px serif";
        context.fillStyle = color
        context.fillText(text, x, y)
    }

    drawRectWithLabel(x, y, w, h, text, fontSize, RectColor = "green", textColor = "black") {
        this.drawRect(x, y, w, h, RectColor)
        let x1 = x + 0.2 * x
        let y1 = y + 0.5 * y
        this.drawLabel(text, x1, y1, textColor, fontSize)
    }

    draw() {

    }

    update() {

    }
}
