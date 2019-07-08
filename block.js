var Block = function() {
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: 0,
        y: 0,
        w: 40,
        h: 20,
        alive: true, // 砖块是否显示，默认是显示的
    }
    // 砖块碰撞，不在显示
    o.kill = function() {
        o.alive = false
    }
    // 检测砖块和球是否已经碰撞了
    o.collide = function (ball) {
        var b = ball
        // 判断相撞，要有两次 o in b， b in o，并且砖块 alive = true
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}