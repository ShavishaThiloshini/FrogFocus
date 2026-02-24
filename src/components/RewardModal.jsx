import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { X } from 'lucide-react'

const RewardModal = ({ isOpen, onClose, rewards, newReward }) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen && newReward) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, newReward])

  if (!isOpen) return null

  const rewardConfig = {
    book: {
      icon: '📖',
      name: 'New Book',
      description: 'Your frog can now read a new book!',
    },
    coffee: {
      icon: '☕',
      name: 'Coffee Style',
      description: 'New coffee for your frog to enjoy!',
    },
    background: {
      icon: '🌲',
      name: 'New Background',
      description: 'Beautiful nature background unlocked!',
    },
  }

  const reward = newReward ? rewardConfig[newReward.type] || rewardConfig.book : null

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-soft-lg p-8 max-w-md w-full animate-in zoom-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-primary-green">🎁 Reward!</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-soft-green/30 rounded-full transition-all"
            >
              <X size={24} className="text-brown-accent" />
            </button>
          </div>

          {newReward && reward ? (
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce">{reward.icon}</div>
              <h3 className="text-2xl font-bold text-brown-accent mb-2">{reward.name}</h3>
              <p className="text-gray-600 mb-8">{reward.description}</p>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-primary-green text-white rounded-full font-semibold hover:bg-green-600 transition-all"
              >
                Awesome! 🎉
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-brown-accent mb-4">Your Rewards</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {rewards?.map((reward) => (
                  <div key={reward.id} className="flex flex-col items-center">
                    <div className="text-4xl mb-2">{rewardConfig[reward.type]?.icon || '🎁'}</div>
                    <p className="text-xs text-center text-gray-600">
                      {rewardConfig[reward.type]?.name || 'Reward'}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-soft-green text-brown-accent rounded-full font-semibold hover:bg-soft-green/80 transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default RewardModal
