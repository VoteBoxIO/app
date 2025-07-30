import React, { FC, ReactNode } from 'react'

export const ShareButton: FC<{ boxTitle: ReactNode; boxId: number }> = ({
  boxTitle,
  boxId,
}) => {
  const handleShareButtonClick = async () => {
    const BOT_USERNAME = process.env.BOT_USERNAME
    // У всех ботов задано одинаковое имя приложения
    const APP_NAME = 'votebox'

    if (!BOT_USERNAME) {
      console.error('BOT_USERNAME is not defined in environment variables')
      return
    }

    const deepLink = `https://t.me/${BOT_USERNAME}/${APP_NAME}?startapp=ref_123=box_${boxId}`

    // Check if Web Share API is available (mobile browsers typically support this)
    if (navigator.share) {
      try {
        await navigator.share({
          title: typeof boxTitle === 'string' ? boxTitle : 'VoteBox Poll',
          text: 'Check out this poll on VoteBox!',
          url: deepLink,
        })
      } catch (error) {
        // User cancelled the share dialog or an error occurred
        console.log('Share cancelled or failed:', error)
      }
    } else {
      // Fallback to clipboard copy for desktop or browsers without share support
      try {
        await navigator.clipboard.writeText(deepLink)
        // Show a more subtle notification instead of alert
        window.Telegram?.WebApp?.showPopup({
          title: 'Link Copied!',
          message: 'The link has been copied to your clipboard.',
          buttons: [{ type: 'ok' }],
        })
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        // Fallback to alert if Telegram WebApp is not available
        alert('Link copied to clipboard!')
      }
    }
  }

  return (
    <button onClick={handleShareButtonClick}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="18" fill="white" />
        <path
          d="M27.0002 17.4591L17.4002 11.1001L17.4002 14.7001C9 16.5001 9 24.9001 9 24.9001C9 24.9001 12.6 20.1001 17.4002 20.7001L17.4002 24.4201L27.0002 17.4591Z"
          stroke="#484848"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
