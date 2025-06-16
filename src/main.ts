import { populateCardSides, unitCardSides, unitElements } from "./htmlElements"
import "./style.css"
import { formatTime, getRemainingTime } from "./utils"

let timeout1: number = 0,
  timeout2: number = 0

populateCardSides()
window.addEventListener("focus", () => {
  populateCardSides()
  clearTimeout(timeout1)
  clearTimeout(timeout2)
})

const animateFlip = (unit: keyof typeof unitElements, newValue: number) => {
  const [top, topFront, bottom, bottomFront] = unitCardSides(unit)

  if (!top || !topFront || !bottom || !bottomFront) {
    console.error("HTML elements not found for animation")
    return
  }

  const currentValue = parseInt(topFront.textContent!, 10)
  //? This condition prevents unnecessary animation when window first time loads
  if (currentValue === newValue || Number.isNaN(currentValue)) return

  const formattedNewValue = formatTime(newValue).toString()

  topFront.classList.add("animate")
  bottomFront.classList.remove("animate")
  top.innerText = formattedNewValue
  bottomFront.innerText = formattedNewValue

  const timeToAnimate = 300

  timeout1 = setTimeout(() => {
    topFront.classList.remove("animate")
    bottomFront.classList.add("animate")

    topFront.innerText = formattedNewValue

    timeout2 = setTimeout(() => {
      bottom.innerText = formattedNewValue
    }, timeToAnimate - 20)
  }, timeToAnimate)
}

let oldTime: ReturnType<typeof getRemainingTime> | null = null

const timeUnits = Object.keys(unitElements) as (keyof typeof unitElements)[]

const shouldAnimate = (unit: (typeof timeUnits)[number], newValue: number) =>
  !oldTime || oldTime[unit] !== newValue

const updateCountdown = () => {
  const currentTime = getRemainingTime()

  timeUnits.forEach((unit) => {
    if (shouldAnimate(unit, currentTime[unit]))
      animateFlip(unit, currentTime[unit])
  })

  if (currentTime.remainingTime > 0) {
    oldTime = currentTime

    // requestAnimationFrame(updateCountdown)
    setTimeout(updateCountdown, 1000)
  } else console.log("Countdown finished")
}

updateCountdown()
