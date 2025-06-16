import { formatTime, getRemainingTime } from "./utils"

export const unitElements = {
  hours: document.querySelector(".hours")!,
  minutes: document.querySelector(".minutes")!,
  seconds: document.querySelector(".seconds")!,
}

export const unitCardSides = (unit: keyof typeof unitElements) =>
  ["top", "top-front", "bottom", "bottom-front"].map(
    (side) => unitElements[unit].querySelector(`.${side}`) as HTMLDivElement
  )

export const populateCardSides = () => {
  const date = getRemainingTime()
  Object.entries(unitElements).forEach(([unit]) => {
    const value = date[unit as keyof typeof date]

    unitCardSides(unit as keyof typeof unitElements).forEach((side) => {
      if (side.classList.contains("animate")) side.classList.remove("animate")
      side.innerText = formatTime(value)
    })
  })
}
