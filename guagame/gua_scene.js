class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModelEnable = true
        this.elements = []

    }

    // 将子类中的共同方法提取到父类中
    static new(game) {
        return new this(game)
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    deleteElement(img) {
        img.scene = this
        let index = this.elements.indexOf(img)
        this.elements.splice(index, 1)
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

    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.draw()
        }
    }

    update() {
        if (this.debugModelEnable) {
            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i]
                e.debug && e.debug()
            }
        }

        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
    }
}
