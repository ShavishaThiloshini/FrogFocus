import React, { useMemo } from 'react'
import { useTimer } from '../context/TimerContext'
import Lottie from 'lottie-react'

// Default Frog animation states - using simple CSS animations
const Frog = () => {
  const { timeLeft, isRunning, isBreak } = useTimer()

  const frogState = useMemo(() => {
    if (timeLeft === 0 && !isRunning) return 'celebrate'
    if (isBreak) return 'resting'
    if (isRunning) return 'studying'
    return 'idle'
  }, [timeLeft, isRunning, isBreak])

  const getVideoPath = () => {
    switch (frogState) {
      case 'studying':
        return '/FOCUS.mp4'
      case 'resting':
        return '/REST.mp4'
      case 'celebrate':
      case 'idle':
      default:
        return '/DEFAULT.mp4'
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        key={getVideoPath()}
        src={getVideoPath()}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Very subtle edge softening, no more dark centering overlays */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
    </div>
  )
}

export default Frog
