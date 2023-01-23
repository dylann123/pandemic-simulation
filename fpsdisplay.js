class FPSDisplay {
    constructor(x, y, color, fontsize) {
        this.x = x
        this.y = y + 5
        this.color = color
        this.fontsize = fontsize + "px"
        this.fps = 0
        this.startTime = 0
        this.endTime = 0
    }

    startTimestamp() {
        this.startTime = performance.now()
    }
    endTimestamp() {
        this.endTime = performance.now()
    }
    calculateFPS() {
        this.fps = 1000 / (this.endTime - this.startTime)
        this.fps = this.fps.toFixed(2)
    }
    displayFPS(type) {
        ctx.fillStyle = this.color
        ctx.font = this.fontsize + " Arial"
        ctx.fillText(this.fps + " " + (type || "") + " fps", this.x, this.y)
    }
}

