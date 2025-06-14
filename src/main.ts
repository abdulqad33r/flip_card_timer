import "./style.css"
import { formatTime, getRemainingTime } from "./utils"

const unitElements = {
  hours: document.querySelector(".hours")!,
  minutes: document.querySelector(".minutes")!,
  seconds: document.querySelector(".seconds")!,
}
if (Object.values(unitElements).some((el) => el === null))
  console.error("Missing DOM elements for countdown")

type ElementsType = (typeof unitElements)[keyof typeof unitElements]

const animateFlip = (element: ElementsType, newValue: number) => {
  const [top, topFront, bottom, bottomFront] = [
    "top",
    "top-front",
    "bottom",
    "bottom-front",
  ].map(
    (className) =>
      element.querySelector(`.${className}`) as HTMLDivElement | null
  )

  if (!top || !topFront || !bottom || !bottomFront) {
    console.error("HTML elements not found for animation")
    return
  }

  const formattedNewValue = formatTime(newValue).toString()

  topFront.classList.add("animate")
  bottomFront.classList.remove("animate")
  top.innerText = formattedNewValue
  bottomFront.innerText = formattedNewValue

  const timeToAnimate = 300

  setTimeout(() => {
    topFront.classList.remove("animate")
    bottomFront.classList.add("animate")

    topFront.innerText = formattedNewValue

    setTimeout(() => {
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
      animateFlip(unitElements[unit], currentTime[unit])
  })

  if (currentTime.remainingTime > 0) {
    oldTime = currentTime

    // requestAnimationFrame(updateCountdown)
    setTimeout(updateCountdown, 1000)
  } else console.log("Countdown finished")
}

updateCountdown()
