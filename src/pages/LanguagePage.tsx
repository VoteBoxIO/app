import { styled } from '@linaria/react'
import React, { FC } from 'react'

export const LanguagePage: FC = () => {
  const handleLanguageChange = (language: string) => {
    localStorage.setItem('language', language)
    window.location.href = '/'
  }

  return (
    <LanguagePageContainer>
      <LanguageButton onClick={() => handleLanguageChange('ru')}>
        Русский
      </LanguageButton>
      <LanguageButton onClick={() => handleLanguageChange('en')}>
        English
      </LanguageButton>
    </LanguagePageContainer>
  )
}

const LanguagePageContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  gap: 8px;
`
const LanguageButton = styled.button``

export const languagePagePath = '/language'
