let humans = []
let stats = {
    normal: 0,
    infected: 0,
    dead: 0,
    recovered: 0
}
let humanCount = 1000
let fps = {
    physics: new FPSDisplay(0, 30, "black", 16),
    draw: new FPSDisplay(0, 10, "black", 16)
}
function initSimulation() {
    clearInterval(physicsInterval)
    clearInterval(drawInterval)
    humanCount = humanCountInput.value
    humans = []
    stats = {
        normal: 0,
        infected: 0,
        dead: 0
    }
    let options = {
        infected: false,
        actionSpeed: parseFloat(humanSpeedInput.value) / 2,
        bounceVariance: parseFloat(bounceVarianceInput.value),
        minDeathTime: parseFloat(minDeathTimeInput.value),
        maxDeathTime: parseFloat(maxDeathTimeInput.value),
        radius: parseFloat(humanRadiusInput.value),
        canRecover: canRecoverInput.checked,
        recoveryChance: parseFloat(recoveryChanceInput.value),
        canGetInfectAfterRecovered: canGetInfectAfterRecoveredInput.checked,
        recoveryChanceAfterRecovery: recoveryChanceAfterRecoveryInput.value
    }
    for (let i = 0; i < humanCount - 1; i++) {
        humans.push(new Human(Math.random() * canvasWidth - options.radius, Math.random() * canvasHeight - 1, options))
    }
    options.infected = true
    humans.push(new Human(Math.random() * canvasWidth - options.radius, Math.random() * canvasHeight - 1, options))
    console.log(humans[humans.length - 1])
    clearInterval(physicsInterval)
    clearInterval(drawInterval)
    physicsLoop()
    drawLoop()
}
let physicsInterval
function physicsLoop() {
    console.log("Physics fps: "+parseInt(physicsFPSCap.value));
    physicsInterval = setInterval(() => {
        fps.physics.endTimestamp()
        fps.physics.calculateFPS()

        fps.physics.startTimestamp()
        stats = {
            normal: 0,
            infected: 0,
            dead: 0,
            recovered: 0
        }
        humans.forEach((human, index) => {
            human.tick()
            for (let i = 0; i < humans.length; i++) {
                human.touchHuman(humans[i])
            }
            if (!human.dead) {
                if (human.infected) {
                    stats.infected++
                }
                else {
                    if (human.recovered)
                        stats.recovered++
                    else
                        stats.normal++
                }
            }
            else {
                stats.dead++
            }
        })
        
        updateStatistics(stats)
    }, 1000/parseInt(physicsFPSCap.value));
}
let drawInterval
function drawLoop() {
    console.log("Draw fps: "+parseInt(displayFPSCap.value));
    drawInterval = setInterval(() => {
        fps.draw.endTimestamp()
        fps.draw.calculateFPS()
        
        fps.draw.startTimestamp()
        stats = {
            normal: 0,
            infected: 0,
            dead: 0,
            recovered: 0
        }
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        humans.forEach((human, index) => {
            if (!human.dead) {
                human.draw(ctx)
            }
        })
        fps.draw.displayFPS("draw")
        fps.physics.displayFPS("physics")
    }, 1000/parseInt(displayFPSCap.value));
}



function updateStatistics(stats) {
    normal.innerText = "Normal: " + stats.normal
    infected.innerText = "Infected: " + stats.infected
    dead.innerText = "Dead: " + stats.dead
    recovered.innerText = "Recovered: " + stats.recovered
}

initSimulation()