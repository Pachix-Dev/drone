import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

const MyComponent = () => {
  const confettiContainerRef = useRef(null)

  useEffect(() => {
    const confettiConfig = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    }

    const confettiContainer = confettiContainerRef.current

    const launchConfetti = () => {
      if (confettiContainer) {
        confetti(confettiConfig, { target: confettiContainer })
      }
    }

    // Initial confetti launch on mount
    launchConfetti()

    // Set interval to repeat confetti every 5 seconds
    const confettiInterval = setInterval(() => {
      // Reset confetti after 5 seconds and launch again
      confetti.reset({ clear: true })
      launchConfetti()
    }, 5000) // Adjust the interval duration as needed (in milliseconds)

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(confettiInterval)
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div
      ref={confettiContainerRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100vh',
        zIndex: -9999,
      }}
    ></div>
  )
}

export default MyComponent
