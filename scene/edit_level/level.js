class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }
    setup() {
        this.level = Level.new(this.game)

        this.levelNumber = 1
        this.blocks = []

        this.positions = []

        this.initBlocksNumber = 5

        // 当前选中砖块生命
        this.blockLivies = 2

        this.bindEvent()

    }

    setupInputs() {
        let game = this.game
        let self = this

        game.registerAction('Enter', function(keyStatus) {
            log('Enter', keyStatus)
            if (keyStatus === 'up') {
                // 保存当前 blocks 数据

                self.level.saveLevel(self.levelNumber, self.positions)
                self.levelNumber++
                // 清空当前 positions 数据，进入下一关编辑
                self.positions = []
                self.blocks = []
            }
        })

        game.registerAction('k', function() {
            // 开始游戏
            let s = Scene.new(game)
            game.replaceScene(s)
        })
    }

    drawInitBlocks() {
        for (let i = 0; i < this.initBlocksNumber; i++) {
            let x = CANVAS_WIDTH - BLCOK_WIDTH * (i + 1)
            let y = CANVAS_HEIGHT - BLOCK_HEIGHT
            let lives = i + 1
            let position = [x, y, lives]
            let e = Block.new(this.game, position)
            e.draw()
        }
    }
    
    drawGrid(color, stepx, stepy) {
        let context = this.game.context
        let width = context.canvas.width
        let height = context.canvas.height

        context.save()
        context.strokeStyle = color
        context.lineWidth = 0.5
        context.clearRect(0, 0, width, height)

        for (let i = stepx + 0.5; i < width; i += stepx) {
            context.beginPath()
            context.moveTo(i, 0)
            context.lineTo(i, height)
            context.stroke()
        }

        for (let i = stepy + 0.5; i < height; i += stepy) {
            context.beginPath()
            context.moveTo(0, i)
            context.lineTo(width, i)
            context.stroke()
        }

        context.restore()
    }

    bindEvent() {
        let game = this.game
        let self = this
        
        // mouse event
        game.canvas.addEventListener('mousedown', function(event) {
            let x = event.offsetX
            let y = event.offsetY

            if (y < CANVAS_HEIGHT - 80) {
                // 可编辑区域应该在挡板之上

                // 应该检查 block 是否已存在，再添加
                let block_x = x - (x % BLCOK_WIDTH)
                let block_y = y - (y % BLOCK_HEIGHT)
                let position = [block_x, block_y, self.blockLivies]
                self.positions.push(position)
                let block = Block.new(game, position)
                self.blocks.push(block)
            } else if (y > (CANVAS_HEIGHT - BLOCK_HEIGHT) && (x > CANVAS_WIDTH - self.initBlocksNumber * BLCOK_WIDTH)) {
                self.blockLivies = Math.ceil((CANVAS_WIDTH - x) / BLCOK_WIDTH)
            }
        })
    }

    drawBlocks() {
        for (let i = 0; i < this.blocks.length; i++) {
            let e = this.blocks[i]
            e.draw()
        }
    }

    draw() {
        super.draw()
        this.drawGrid('#ccc', 50, 20)

        this.drawInitBlocks()

        this.drawLabel(`第 ${this.levelNumber} 关`, 10, 445, "red", 20)
        this.drawLabel("从右至左，砖块生命1-5", 10, 470, "black", 20)
        this.drawLabel("按Enter完成编辑，按 k 开始新的一关", 10, 495, "black", 20)


        this.drawBlocks()
    }

}
