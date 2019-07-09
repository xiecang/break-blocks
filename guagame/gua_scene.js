class GuaScene {
    constructor(game) {
        this.game = game
    }

    // 将子类中的共同方法提取到父类中
    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {

    }

    update() {

    }
}
