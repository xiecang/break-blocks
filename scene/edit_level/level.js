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
            // 应该检查 block 是否已存在，再添加
            let block_x = x - (x % 50)
            let block_y = y - (y % 20)
            let position = [block_x, block_y, 2]
            self.positions.push(position)
            let block = Block.new(game, position)
            self.blocks.push(block)
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

        this.drawLabel(`第 ${this.levelNumber} 关`, 10, 445, "red", 20)
        this.drawLabel("从左至右，砖块生命依次递增", 10, 470, "black", 20)
        this.drawLabel("按Enter完成编辑，按 k 开始新的一关", 10, 495, "black", 20)


        this.drawBlocks()
    }

}
