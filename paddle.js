// 一个 Paddle 对象
var Paddle = function () {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 5,
    }

    // paddle 移动逻辑
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }

    // paddle 和 ball 的碰撞,碰撞了返回 true
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                log('球和挡板相撞了')
                return true
            }
        }
        return false
    }
    return o

}
