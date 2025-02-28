import { styled } from '@linaria/react'
import React, { FC, useContext } from 'react'
import { AppContext } from '../App.context'

export const LanguagePage: FC = () => {
  const { basePath } = useContext(AppContext)

  const handleLanguageChange = (language: string) => {
    localStorage.setItem('language', language)
    window.location.href = basePath
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
  height: 100%;
  display: grid;
  grid-gap: 8px;
  gap: 8px;
`
const LanguageButton = styled.button``

export const languagePagePath = '/language'
