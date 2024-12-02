import { useEffect } from 'react'
import { animate, useMotionValue } from 'motion/react'
import type { MotionValue } from 'motion/react'

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)'
const activeShadow = '5px 5px 10px rgba(0,0,0,0.3)'
const inactiveScale = 1
const activeScale = 1.02
const duration = 0.2

export function useRaisedStyle(value: MotionValue<number>) {
  const scale = useMotionValue(inactiveScale)
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false

    return value.on('change', latest => {
      const wasActive = isActive
      if (latest !== 0) {
        isActive = true
        if (isActive !== wasActive) {
          animate(scale, activeScale, { duration })
          animate(boxShadow, activeShadow, { duration })
        }
      } else {
        isActive = false
        if (isActive !== wasActive) {
          animate(scale, inactiveScale, { duration })
          animate(boxShadow, inactiveShadow, { duration })
        }
      }
    })
  }, [value, scale, boxShadow])

  return { scale, boxShadow }
}
