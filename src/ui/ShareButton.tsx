import React, { FC } from 'react'

export const ShareButton: FC<{ boxId: number }> = ({ boxId }) => {
  const handleShareButtonClick = () => {
    const BOT_USERNAME = process.env.BOT_USERNAME
    // У всех ботов задано одинаковое имя приложения
    const APP_NAME = 'votebox'

    if (!BOT_USERNAME) {
      console.error('BOT_USERNAME is not defined in environment variables')
      return
    }

    const deepLink = `t.me/${BOT_USERNAME}/${APP_NAME}?startapp=ref_123=box_${boxId}`

    // copy url to clipboard
    navigator.clipboard.writeText(deepLink)
    // show a message to the user
    alert('Link copied to clipboard!')
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
