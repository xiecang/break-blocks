let Ball = function (game) {
    let o = game.imageByName('ball')

    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    // 发射改变 fired 状态
    o.fire = function () {
        o.fired = true
    }
    // ball 的移动逻辑
    o.move = function () {
        // 发射状态
        if (o.fired) {
            // 撞到墙了，球要反弹，球宽高都是8
            if (o.x < 0 || o.x + 8 > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y + 8 > 300) {
                o.speedY = -o.speedY
            }
            // 球运动
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    // ball 的反弹函数
    o.fjtj = function () {
        // log('反弹了')
        o.speedY *= -1
    }
    // 判断一个点是否在矩形内(点击的点)
    o.hasPoint = function (x, y) {
        let xIn = x >= o.x && x <= o.x + o.w
        let yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
