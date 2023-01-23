const canvas = document.getElementsByTagName("canvas")[0]
const ctx = canvas.getContext("2d")
const canvasWidth = canvas.width
const canvasHeight = canvas.height

const normal = document.getElementById("normal")
const infected = document.getElementById("infected")
const dead = document.getElementById("dead")
const recovered = document.getElementById("recovered")

const humanCountInput = document.getElementById("humanCount")
const humanSpeedInput = document.getElementById("humanSpeed")
const humanRadiusInput = document.getElementById("humanRadius")
const bounceVarianceInput = document.getElementById("bounceVariance")
const minDeathTimeInput = document.getElementById("minDeathTime")
const maxDeathTimeInput = document.getElementById("maxDeathTime")
const canRecoverInput = document.getElementById("canRecover")
const recoveryChanceInput = document.getElementById("recoveryChance")
const canGetInfectAfterRecoveredInput = document.getElementById("canGetInfectAfterRecovered")
const recoveryChanceAfterRecoveryInput = document.getElementById("recoveryChanceAfterRecovery")

const displayFPSCap = document.getElementById("display-cap")
const physicsFPSCap = document.getElementById("physics-cap")