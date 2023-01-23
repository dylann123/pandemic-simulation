/**
 * @param x x position
 * @param y y position
 * @param options options object
 */

class Human {
    constructor(x, y, options) {
        this.x = x
        this.y = y
        this.actionSpeed = options.actionSpeed || .5
        this.bounceVariance = options.bounceVariance || 2
        this.minDeathTime = options.minDeathTime || 2000
        this.maxDeathTime = options.maxDeathTime || 10000
        this.xVel = (Math.floor(Math.random() * 2) == 1) ? this.actionSpeed : -this.actionSpeed
        this.yVel = (Math.floor(Math.random() * 2) == 1) ? this.actionSpeed : -this.actionSpeed
        this.radius = options.radius || 2
        this.infected = options.infected || false
        this.timeUntilDeath = 10000
        this.dead = false
        this.canRecover = options.canRecover || true
        this.recoveryChance = options.recoveryChance / 100 || .1
        this.canGetInfectAfterRecovered = (options.canGetInfectAfterRecovered == undefined) ? true : options.canGetInfectAfterRecovered
        this.recoveryChanceAfterRecovery = options.recoveryChanceAfterRecovery / 100 || .1
        this.recovered = false;
        this.hasRecovered = false;
    }
    tick() {
        if (this.dead) return
        if (this.x <= this.radius) this.xVel *= -1
        if (this.x >= canvasWidth - this.radius) this.xVel *= -1
        if (this.y <= this.radius) this.yVel *= -1
        if (this.y >= canvasHeight - this.radius) this.yVel *= -1



        if (this.timeUntilDeath <= 0 && this.infected) {
            if (this.canGetInfectAfterRecovered && this.hasRecovered) {
                if(Math.random() < this.recoveryChanceAfterRecovery) {
                    this.recover()
                }else{
                    this.kill()
                }
            }
            else{
                if (this.canRecover && Math.random() < this.recoveryChance) {
                    this.recover()
                } else {
                    this.kill()
                }
            }
            return
        } else {
            this.timeUntilDeath -= (1000 / 60) * this.actionSpeed*2
        }

        this.x += this.xVel
        this.y += this.yVel
    }
    /**
    @param ctx Canvas context
    */
    draw(ctx) {
        ctx.fillStyle = this.infected ? "red" : "blue"
        ctx.fillStyle = this.recovered ? "purple" : ctx.fillStyle
        ctx.strokeStyle = ctx.fillStyle
        // ctx.fillRect(this.x - 1, this.y - 1, this.radius, this.radius)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
    }
    /**
    @param otherHuman returns if touching another Human object
    */
    detectHumanCollision(otherHuman) {
        return Math.sqrt(((otherHuman.x - this.x) ** 2) + ((otherHuman.y - this.y) ** 2)) < this.radius * 2
    }
    /**
    @param otherHuman returns if touching another Human object
    */
    touchHuman(otherHuman) {
        if (this.detectHumanCollision(otherHuman) && !otherHuman.dead) {
            if (otherHuman.infected) this.infect()
            if (this.infected) otherHuman.infect()
            if (this.bounceVariance > 0) {
                if (this.x < otherHuman.x) this.xVel = -Math.abs(this.actionSpeed) * (Math.random() * this.bounceVariance)
                if (this.x > otherHuman.x) this.xVel = Math.abs(this.actionSpeed) * (Math.random() * this.bounceVariance)
                if (this.y < otherHuman.y) this.yVel = -Math.abs(this.actionSpeed) * (Math.random() * this.bounceVariance)
                if (this.y > otherHuman.y) this.yVel = Math.abs(this.actionSpeed) * (Math.random() * this.bounceVariance)
            } else {
                if (this.x < otherHuman.x) this.xVel = -Math.abs(this.actionSpeed)
                if (this.x > otherHuman.x) this.xVel = Math.abs(this.actionSpeed)
                if (this.y < otherHuman.y) this.yVel = -Math.abs(this.actionSpeed)
                if (this.y > otherHuman.y) this.yVel = Math.abs(this.actionSpeed)
            }

        }
    }

    infect() {
        if (!this.canGetInfectAfterRecovered && this.recovered) {
            return
        }
        if (!this.infected) this.timeUntilDeath = Math.floor(Math.random() * this.maxDeathTime) + this.minDeathTime
        this.infected = true
        this.recovered = false
    }
    kill() {
        this.x = NaN
        this.y = NaN
        this.dead = true
    }
    recover() {
        this.recovered = true
        this.infected = false
        this.hasRecovered = true
    }
}