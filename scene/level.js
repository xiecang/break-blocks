class Level {
    constructor(game) {
        this.game = game

        this.levels = []
        this.setup()
    }

    static new(game, name) {
        let i = new this(game, name)
        return i
    }


    setup() {
        this.loadLevels()
        if (this.levels === undefined) {
            this.resetLevel()
        }

        this.levelNumber = 1
        this.maxLevel = Object.keys(this.levels).length
    }

    resetLevel() {
        this.levels = {
            1: [
                [0, 0,],
            ],
            2: [
                // x, y, lives
                [0, 0,],
                [100, 100,],
            ],
            3: [
                [0, 0,],
                [100, 100, 3],
                [100, 150, 2],
            ],
        }
        this.saveLevels()
    }

    loadLevels() {
        /*
        let levels = {
            1: [
                [0, 0,],
            ],
            2: [
                // x, y, lives
                [0, 0,],
                [100, 100,],
            ],
            3: [
                [0, 0,],
                [100, 100, 3],
                [100, 150, 2],
            ],
        }
        */
        let ls = localStorage.levels
        this.levels = JSON.parse(ls)
    }

    loadLevel(n, reload = false) {
        // n 是 int
        if (reload) {
            // 从 localstorage 中重新读取关卡
            this.loadLevels()
        }
        let level = this.levels[n]
        let game = this.game

        let blocks = []
        for (let i = 0; i < level.length; i++) {
            let p = level[i]
            let b = Block.new(game, p)
            blocks.push(b)
        }

        log(level, blocks, n)
        return blocks
    }

    loadNextLevel() {
        this.levelNumber++
        if (this.levelNumber > this.maxLevel) {
            return null
        }
        let blocks =  this.loadLevel(this.levelNumber)
        return blocks
    }

    saveLevels(levels) {
        let l = levels || this.levels
        let ls = JSON.stringify(l)
        localStorage.levels = ls
        this.maxLevel = Object.keys(this.levels).length
    }

    saveLevel(n, data) {
        this.levels[n] = data
        this.saveLevels()
    }


}