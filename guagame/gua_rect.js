class Rect {
    constructor(x, y, w, h, color) {
        // x, y 是左边顶点坐标
        // w, h 是宽高
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    static new(...args) {
        return new this(...args)
    }

    hasPoint(pointX, pointY) {
        let {x, y, w, h,} = this
        // log(x, y , w, h)
        let xIn = pointX >= x && pointX <= x + w
        let yIn = pointY >= y && pointY <= y + h
        return xIn && yIn
    }


    draw(context) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.w, this.h)
    }
}